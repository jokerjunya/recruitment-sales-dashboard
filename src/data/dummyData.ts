import { SalesData, RecruitmentData, KPI } from '../types';

// 売上データ
export const salesData: SalesData[] = [
  { month: '1月', unitA: 120, unitB: 80, unitC: 60, total: 260, yoyGrowth: 5.2, momGrowth: 1.2 },
  { month: '2月', unitA: 132, unitB: 85, unitC: 63, total: 280, yoyGrowth: 6.8, momGrowth: 7.7 },
  { month: '3月', unitA: 145, unitB: 90, unitC: 68, total: 303, yoyGrowth: 8.2, momGrowth: 8.2 },
  { month: '4月', unitA: 150, unitB: 88, unitC: 72, total: 310, yoyGrowth: 7.5, momGrowth: 2.3 },
  { month: '5月', unitA: 148, unitB: 92, unitC: 75, total: 315, yoyGrowth: 9.0, momGrowth: 1.6 },
  { month: '6月', unitA: 155, unitB: 95, unitC: 80, total: 330, yoyGrowth: 10.5, momGrowth: 4.8 },
  { month: '7月', unitA: 160, unitB: 100, unitC: 85, total: 345, yoyGrowth: 12.0, momGrowth: 4.5 },
  { month: '8月', unitA: 158, unitB: 98, unitC: 82, total: 338, yoyGrowth: 9.8, momGrowth: -2.0 },
  { month: '9月', unitA: 165, unitB: 105, unitC: 88, total: 358, yoyGrowth: 11.5, momGrowth: 5.9 },
  { month: '10月', unitA: 175, unitB: 110, unitC: 92, total: 377, yoyGrowth: 13.2, momGrowth: 5.3 },
  { month: '11月', unitA: 180, unitB: 115, unitC: 95, total: 390, yoyGrowth: 14.0, momGrowth: 3.4 },
  { month: '12月', unitA: 190, unitB: 120, unitC: 100, total: 410, yoyGrowth: 15.5, momGrowth: 5.1 },
];

// 採用データ
export const recruitmentData: RecruitmentData[] = [
  { month: '1月', applicants: 150, interviews: 75, offers: 30, hires: 25 },
  { month: '2月', applicants: 165, interviews: 82, offers: 33, hires: 28 },
  { month: '3月', applicants: 180, interviews: 90, offers: 36, hires: 30 },
  { month: '4月', applicants: 200, interviews: 100, offers: 40, hires: 35 },
  { month: '5月', applicants: 210, interviews: 105, offers: 42, hires: 36 },
  { month: '6月', applicants: 220, interviews: 110, offers: 44, hires: 38 },
  { month: '7月', applicants: 240, interviews: 120, offers: 48, hires: 42 },
  { month: '8月', applicants: 230, interviews: 115, offers: 46, hires: 40 },
  { month: '9月', applicants: 250, interviews: 125, offers: 50, hires: 43 },
  { month: '10月', applicants: 270, interviews: 135, offers: 54, hires: 47 },
  { month: '11月', applicants: 280, interviews: 140, offers: 56, hires: 48 },
  { month: '12月', applicants: 300, interviews: 150, offers: 60, hires: 52 },
];

// KPIデータ
export const kpiData: KPI[] = [
  { title: '年間売上', value: '4,016百万円', change: 10.2, isPositive: true },
  { title: '月間売上成長率', value: '5.1%', change: 0.3, isPositive: true },
  { title: '年間採用数', value: 464, change: 15.5, isPositive: true },
  { title: '採用コンバージョン率', value: '17.3%', change: 1.2, isPositive: true },
]; 