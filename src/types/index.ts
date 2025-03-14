// 売上データの型定義
export interface SalesData {
  month: string;
  unitA: number;
  unitB: number;
  unitC: number;
  total: number;
  yoyGrowth?: number;
  momGrowth?: number;
}

// 採用データの型定義
export interface RecruitmentData {
  month: string;
  applicants: number;
  interviews: number;
  offers: number;
  hires: number;
}

// KPIの型定義
export interface KPI {
  title: string;
  value: string | number;
  change: number;
  isPositive: boolean;
} 