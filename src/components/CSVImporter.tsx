import { useState } from 'react';
import Papa from 'papaparse';
import { SalesData, RecruitmentData } from '../types';

interface CSVImporterProps {
  onSalesDataImport: (data: SalesData[]) => void;
  onRecruitmentDataImport: (data: RecruitmentData[]) => void;
}

const CSVImporter = ({ onSalesDataImport, onRecruitmentDataImport }: CSVImporterProps) => {
  const [importType, setImportType] = useState<'sales' | 'recruitment'>('sales');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsedData = results.data;
        
        if (importType === 'sales') {
          // 売上データの変換処理
          const salesData = parsedData.map((item: any) => ({
            month: item.month || '',
            unitA: Number(item.unitA) || 0,
            unitB: Number(item.unitB) || 0,
            unitC: Number(item.unitC) || 0,
            total: Number(item.total) || 0,
            yoyGrowth: Number(item.yoyGrowth) || 0,
            momGrowth: Number(item.momGrowth) || 0,
          })).filter((item: SalesData) => item.month);
          
          onSalesDataImport(salesData);
        } else {
          // 採用データの変換処理
          const recruitmentData = parsedData.map((item: any) => ({
            month: item.month || '',
            applicants: Number(item.applicants) || 0,
            interviews: Number(item.interviews) || 0,
            offers: Number(item.offers) || 0,
            hires: Number(item.hires) || 0,
          })).filter((item: RecruitmentData) => item.month);
          
          onRecruitmentDataImport(recruitmentData);
        }
      },
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
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>CSVフォーマット:</p>
        {importType === 'sales' ? (
          <p className="font-mono text-xs mt-1">month,unitA,unitB,unitC,total,yoyGrowth,momGrowth</p>
        ) : (
          <p className="font-mono text-xs mt-1">month,applicants,interviews,offers,hires</p>
        )}
      </div>
    </div>
  );
};

export default CSVImporter; 