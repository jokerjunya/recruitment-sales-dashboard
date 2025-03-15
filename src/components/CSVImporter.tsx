import { useState } from 'react';
import Papa from 'papaparse';
import { SalesData, RecruitmentData, CSVImportError, SalesDataCSV, RecruitmentDataCSV } from '../types';
import CSVDownloadSample from './CSVDownloadSample';

interface CSVImporterProps {
  onSalesDataImport: (data: SalesData[]) => void;
  onRecruitmentDataImport: (data: RecruitmentData[]) => void;
}

const CSVImporter = ({ onSalesDataImport, onRecruitmentDataImport }: CSVImporterProps) => {
  const [importType, setImportType] = useState<'sales' | 'recruitment'>('sales');
  const [error, setError] = useState<CSVImportError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [importSuccess, setImportSuccess] = useState<boolean>(false);

  // CSVフォーマットの検証
  const validateSalesCSV = (data: any[]): CSVImportError | null => {
    if (data.length === 0) {
      return { message: 'CSVファイルにデータがありません', type: 'error' };
    }

    const requiredFields = ['Month', 'Total_Sales', 'Business_Unit_A', 'Business_Unit_B', 'Business_Unit_C'];
    const firstRow = data[0];
    
    const missingFields = requiredFields.filter(field => !(field in firstRow));
    if (missingFields.length > 0) {
      // 従来のフォーマットもチェック
      const legacyFields = ['month', 'total', 'unitA', 'unitB', 'unitC'];
      const missingLegacyFields = legacyFields.filter(field => !(field in firstRow));
      
      if (missingLegacyFields.length > 0) {
        return { 
          message: '必須フィールドが不足しています', 
          type: 'error',
          details: `不足しているフィールド: ${missingFields.join(', ')}` 
        };
      } else {
        return { 
          message: '従来のCSVフォーマットが検出されました', 
          type: 'warning',
          details: '新しいフォーマット (Month,Total_Sales,Business_Unit_A,Business_Unit_B,Business_Unit_C) を推奨します' 
        };
      }
    }

    return null;
  };

  const validateRecruitmentCSV = (data: any[]): CSVImportError | null => {
    if (data.length === 0) {
      return { message: 'CSVファイルにデータがありません', type: 'error' };
    }

    const requiredFields = ['Month', 'Applicants', 'Interviews', 'Offers', 'Hires'];
    const firstRow = data[0];
    
    const missingFields = requiredFields.filter(field => !(field in firstRow));
    if (missingFields.length > 0) {
      // 従来のフォーマットもチェック
      const legacyFields = ['month', 'applicants', 'interviews', 'offers', 'hires'];
      const missingLegacyFields = legacyFields.filter(field => !(field in firstRow));
      
      if (missingLegacyFields.length > 0) {
        return { 
          message: '必須フィールドが不足しています', 
          type: 'error',
          details: `不足しているフィールド: ${missingFields.join(', ')}` 
        };
      } else {
        return { 
          message: '従来のCSVフォーマットが検出されました', 
          type: 'warning',
          details: '新しいフォーマット (Month,Applicants,Interviews,Offers,Hires) を推奨します' 
        };
      }
    }

    return null;
  };

  // 新しいフォーマットの売上データを変換
  const convertSalesData = (data: any[]): SalesData[] => {
    return data.map(item => {
      // 新しいフォーマットのフィールドがあるかチェック
      const isNewFormat = 'Month' in item && 'Total_Sales' in item;
      
      if (isNewFormat) {
        // 新しいフォーマットからデータを変換
        const month = item.Month || '';
        const total = Number(item.Total_Sales) || 0;
        const unitA = Number(item.Business_Unit_A) || 0;
        const unitB = Number(item.Business_Unit_B) || 0;
        const unitC = Number(item.Business_Unit_C) || 0;
        
        // 前月比と前年同月比の計算（実際のアプリではより複雑な計算が必要）
        // ここではダミーデータを使用
        const yoyGrowth = 5.0;
        const momGrowth = 2.0;
        
        return {
          month,
          total,
          unitA,
          unitB,
          unitC,
          yoyGrowth,
          momGrowth
        };
      } else {
        // 従来のフォーマットからデータを変換
        return {
          month: item.month || '',
          unitA: Number(item.unitA) || 0,
          unitB: Number(item.unitB) || 0,
          unitC: Number(item.unitC) || 0,
          total: Number(item.total) || 0,
          yoyGrowth: Number(item.yoyGrowth) || 0,
          momGrowth: Number(item.momGrowth) || 0,
        };
      }
    }).filter((item: SalesData) => item.month);
  };

  // 新しいフォーマットの採用データを変換
  const convertRecruitmentData = (data: any[]): RecruitmentData[] => {
    return data.map(item => {
      // 新しいフォーマットのフィールドがあるかチェック
      const isNewFormat = 'Month' in item && 'Applicants' in item;
      
      if (isNewFormat) {
        // 新しいフォーマットからデータを変換
        return {
          month: item.Month || '',
          applicants: Number(item.Applicants) || 0,
          interviews: Number(item.Interviews) || 0,
          offers: Number(item.Offers) || 0,
          hires: Number(item.Hires) || 0,
        };
      } else {
        // 従来のフォーマットからデータを変換
        return {
          month: item.month || '',
          applicants: Number(item.applicants) || 0,
          interviews: Number(item.interviews) || 0,
          offers: Number(item.offers) || 0,
          hires: Number(item.hires) || 0,
        };
      }
    }).filter((item: RecruitmentData) => item.month);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setIsLoading(true);
    setError(null);
    setImportSuccess(false);

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsedData = results.data;
        
        if (importType === 'sales') {
          // 売上データの検証
          const validationError = validateSalesCSV(parsedData);
          if (validationError && validationError.type === 'error') {
            setError(validationError);
            setIsLoading(false);
            return;
          } else if (validationError) {
            setError(validationError);
          }
          
          // 売上データの変換処理
          const salesData = convertSalesData(parsedData);
          if (salesData.length > 0) {
            onSalesDataImport(salesData);
            setImportSuccess(true);
          } else {
            setError({ message: '有効なデータがありません', type: 'error' });
          }
        } else {
          // 採用データの検証
          const validationError = validateRecruitmentCSV(parsedData);
          if (validationError && validationError.type === 'error') {
            setError(validationError);
            setIsLoading(false);
            return;
          } else if (validationError) {
            setError(validationError);
          }
          
          // 採用データの変換処理
          const recruitmentData = convertRecruitmentData(parsedData);
          if (recruitmentData.length > 0) {
            onRecruitmentDataImport(recruitmentData);
            setImportSuccess(true);
          } else {
            setError({ message: '有効なデータがありません', type: 'error' });
          }
        }
        
        setIsLoading(false);
      },
      error: (error) => {
        setError({ message: 'CSVファイルの解析に失敗しました', type: 'error', details: error.message });
        setIsLoading(false);
      }
    });
    
    // ファイル選択をリセット
    event.target.value = '';
  };

  return (
    <div className="card mb-6">
      <h3 className="section-title">データインポート</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="importType"
              value="sales"
              checked={importType === 'sales'}
              onChange={() => setImportType('sales')}
            />
            <span className="ml-2">売上データ</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="importType"
              value="recruitment"
              checked={importType === 'recruitment'}
              onChange={() => setImportType('recruitment')}
            />
            <span className="ml-2">採用データ</span>
          </label>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            CSVファイルをアップロード
          </label>
          <div className="flex items-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="ml-2 animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            )}
          </div>
          {fileName && (
            <p className="mt-1 text-sm text-gray-500">
              選択されたファイル: {fileName}
            </p>
          )}
        </div>
      </div>
      
      {importSuccess && (
        <div className="mt-4 p-3 rounded-md bg-green-50 text-green-700">
          <p className="font-medium">データのインポートに成功しました！</p>
          <p className="text-sm mt-1">グラフが更新されました。</p>
        </div>
      )}
      
      {error && (
        <div className={`mt-4 p-3 rounded-md ${error.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
          <p className="font-medium">{error.message}</p>
          {error.details && <p className="text-sm mt-1">{error.details}</p>}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex justify-between items-center">
          <p>CSVフォーマット:</p>
          <CSVDownloadSample type={importType} />
        </div>
        {importType === 'sales' ? (
          <div>
            <p className="font-mono text-xs mt-1">Month,Total_Sales,Business_Unit_A,Business_Unit_B,Business_Unit_C</p>
            <p className="text-xs mt-1">例: 2024-01,1200000,500000,400000,300000</p>
          </div>
        ) : (
          <div>
            <p className="font-mono text-xs mt-1">Month,Applicants,Interviews,Offers,Hires</p>
            <p className="text-xs mt-1">例: 2024-01,1187,230,168,44</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSVImporter; 