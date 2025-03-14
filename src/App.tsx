import { useState } from 'react'
import './App.css'
import KPICard from './components/KPICard'
import SalesChart from './components/SalesChart'
import RecruitmentChart from './components/RecruitmentChart'
import CSVImporter from './components/CSVImporter'
import { salesData as initialSalesData, recruitmentData as initialRecruitmentData, kpiData } from './data/dummyData'
import { SalesData, RecruitmentData } from './types'

function App() {
  const [salesData, setSalesData] = useState<SalesData[]>(initialSalesData)
  const [recruitmentData, setRecruitmentData] = useState<RecruitmentData[]>(initialRecruitmentData)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">採用・営業ダッシュボード</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">CEO意思決定支援ツール</p>
        </header>

        {/* CSVインポーター */}
        <CSVImporter 
          onSalesDataImport={setSalesData}
          onRecruitmentDataImport={setRecruitmentData}
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
          <p className="mt-1">データは毎月更新されます。最終更新: 2024年5月1日</p>
        </footer>
      </div>
    </div>
  )
}

export default App
