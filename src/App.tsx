import { useState, useEffect } from 'react'
import './App.css'
import KPICard from './components/KPICard'
import SalesChart from './components/SalesChart'
import RecruitmentChart from './components/RecruitmentChart'
import CSVImporter from './components/CSVImporter'
import { salesData as initialSalesData, recruitmentData as initialRecruitmentData } from './data/dummyData'
import { SalesData, RecruitmentData, KPI } from './types'

function App() {
  const [salesData, setSalesData] = useState<SalesData[]>(initialSalesData)
  const [recruitmentData, setRecruitmentData] = useState<RecruitmentData[]>(initialRecruitmentData)
  const [kpiData, setKpiData] = useState<KPI[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleDateString('ja-JP', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }))

  // KPIデータを計算
  useEffect(() => {
    // 売上データからKPIを計算
    const totalSales = salesData.reduce((sum, item) => sum + item.total, 0);
    const lastMonthSales = salesData.length > 0 ? salesData[salesData.length - 1].total : 0;
    const prevMonthSales = salesData.length > 1 ? salesData[salesData.length - 2].total : lastMonthSales;
    const monthlySalesGrowth = prevMonthSales ? ((lastMonthSales - prevMonthSales) / prevMonthSales) * 100 : 0;
    
    // 採用データからKPIを計算
    const totalHires = recruitmentData.reduce((sum, item) => sum + item.hires, 0);
    const totalApplicants = recruitmentData.reduce((sum, item) => sum + item.applicants, 0);
    const hiringRate = totalApplicants ? (totalHires / totalApplicants) * 100 : 0;
    
    // YoY成長率の計算（実際のアプリではより複雑な計算が必要）
    // 現在のデータには前年比が含まれているのでそれを使用
    const lastMonthYoYGrowth = salesData.length > 0 ? salesData[salesData.length - 1].yoyGrowth || 0 : 0;
    
    // 顧客単価の計算（ダミーデータ - 実際のアプリでは顧客数データが必要）
    const customerCount = 1200; // ダミーの顧客数
    const averageRevenuePerCustomer = totalSales / customerCount;
    const customerPriceYoYGrowth = 7.5; // ダミーの前年比成長率
    
    // KPIデータを更新
    const newKpiData: KPI[] = [
      { 
        title: '年間売上', 
        value: `${(totalSales / 1000000).toFixed(2)}百万円`, 
        change: lastMonthYoYGrowth, 
        isPositive: lastMonthYoYGrowth > 0 
      },
      { 
        title: '前年比成長率', 
        value: `${lastMonthYoYGrowth.toFixed(1)}%`, 
        change: lastMonthYoYGrowth - 5, // 前年との比較（ダミー）
        isPositive: lastMonthYoYGrowth > 0 
      },
      { 
        title: '顧客単価', 
        value: `${(averageRevenuePerCustomer / 1000).toFixed(1)}千円`, 
        change: customerPriceYoYGrowth, 
        isPositive: customerPriceYoYGrowth > 0 
      },
      { 
        title: '採用コンバージョン率', 
        value: `${hiringRate.toFixed(1)}%`, 
        change: 1.2, // 前年との比較（ダミー）
        isPositive: true 
      },
    ];
    
    setKpiData(newKpiData);
    setLastUpdated(new Date().toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }));
  }, [salesData, recruitmentData]);

  // データインポート時の処理
  const handleSalesDataImport = (data: SalesData[]) => {
    setSalesData(data);
  };

  const handleRecruitmentDataImport = (data: RecruitmentData[]) => {
    setRecruitmentData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">採用・営業ダッシュボード</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            CEO意思決定支援ツール
            <span className="text-xs ml-2 text-gray-500">（最終更新: {lastUpdated}）</span>
          </p>
        </header>

        {/* CSVインポーター */}
        <CSVImporter 
          onSalesDataImport={handleSalesDataImport}
          onRecruitmentDataImport={handleRecruitmentDataImport}
        />

        {/* KPIセクション */}
        <section className="dashboard-section">
          <h2 className="section-title">主要業績指標</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <KPICard key={index} kpi={kpi} />
            ))}
          </div>
        </section>

        {/* 売上データセクション */}
        <section className="dashboard-section">
          <SalesChart data={salesData} />
        </section>

        {/* 採用データセクション */}
        <section className="dashboard-section">
          <RecruitmentChart data={recruitmentData} />
        </section>

        {/* フッター */}
        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 リクルート ダッシュボード | バージョン 1.0.0</p>
          <p className="mt-1">データは毎月更新されます。最終更新: {lastUpdated}</p>
        </footer>
      </div>
    </div>
  )
}

export default App
