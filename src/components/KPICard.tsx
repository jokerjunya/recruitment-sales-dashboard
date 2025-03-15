import { KPI } from '../types';

interface KPICardProps {
  kpi: KPI;
}

const KPICard = ({ kpi }: KPICardProps) => {
  const { title, value, change, isPositive } = kpi;
  
  return (
    <div className="card flex flex-col p-5 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{value}</p>
      <div className="flex items-center mt-2">
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} flex items-center`}>
          <span className="mr-1 text-lg">{isPositive ? '↑' : '↓'}</span> 
          {Math.abs(change).toFixed(1)}%
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">前年比</span>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} 
            style={{ width: `${Math.min(Math.abs(change) * 5, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {isPositive 
            ? '目標達成率が高いです' 
            : '目標を下回っています'}
        </p>
      </div>
    </div>
  );
};

export default KPICard; 