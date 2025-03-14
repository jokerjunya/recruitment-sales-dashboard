import { KPI } from '../types';

interface KPICardProps {
  kpi: KPI;
}

const KPICard = ({ kpi }: KPICardProps) => {
  const { title, value, change, isPositive } = kpi;
  
  return (
    <div className="card flex flex-col">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <div className="flex items-center mt-2">
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}%
        </span>
        <span className="text-xs text-gray-500 ml-2">前年比</span>
      </div>
    </div>
  );
};

export default KPICard; 