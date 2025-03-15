import { SalesData } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  ComposedChart,
  ReferenceLine,
  Label
} from 'recharts';

interface SalesChartProps {
  data: SalesData[];
}

const SalesChart = ({ data }: SalesChartProps) => {
  // 前年比の平均を計算
  const avgYoYGrowth = data.reduce((sum, item) => sum + (item.yoyGrowth || 0), 0) / data.length;

  return (
    <div className="card">
      <h3 className="section-title">月次売上推移（前年比較）</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              label={{ value: '売上 (単位)', angle: -90, position: 'insideLeft' }} 
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              label={{ value: '成長率 (%)', angle: 90, position: 'insideRight' }} 
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'yoyGrowth' || name === 'momGrowth') {
                  return [`${value}%`, name === 'yoyGrowth' ? '前年同月比' : '前月比'];
                }
                return [value, name === 'unitA' ? '事業部A' : name === 'unitB' ? '事業部B' : name === 'unitC' ? '事業部C' : '合計'];
              }}
              labelFormatter={(label) => `${label}`}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <Legend 
              formatter={(value) => {
                return value === 'unitA' ? '事業部A' : 
                       value === 'unitB' ? '事業部B' : 
                       value === 'unitC' ? '事業部C' : 
                       value === 'total' ? '合計' : 
                       value === 'yoyGrowth' ? '前年同月比' : '前月比';
              }}
              wrapperStyle={{ paddingTop: '10px' }}
            />
            <Bar yAxisId="left" dataKey="unitA" fill="#8884d8" stackId="a" name="unitA" />
            <Bar yAxisId="left" dataKey="unitB" fill="#82ca9d" stackId="a" name="unitB" />
            <Bar yAxisId="left" dataKey="unitC" fill="#ffc658" stackId="a" name="unitC" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="yoyGrowth"
              stroke="#ff7300"
              name="yoyGrowth"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: '#ff7300', strokeWidth: 2 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="momGrowth"
              stroke="#387908"
              name="momGrowth"
              strokeDasharray="5 5"
            />
            {/* 前年比の平均値を示す参照線 */}
            <ReferenceLine 
              yAxisId="right" 
              y={avgYoYGrowth} 
              stroke="#ff7300" 
              strokeDasharray="3 3"
              strokeWidth={2}
            >
              <Label 
                value={`平均: ${avgYoYGrowth.toFixed(1)}%`} 
                position="insideBottomRight"
                fill="#ff7300"
              />
            </ReferenceLine>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p className="font-medium">前年比分析:</p>
        <p>
          平均成長率: <span className="font-semibold text-orange-500">{avgYoYGrowth.toFixed(1)}%</span> | 
          最高成長月: <span className="font-semibold text-green-500">
            {data.reduce((max, item) => Math.max(max, item.yoyGrowth || 0), 0).toFixed(1)}%
          </span>
        </p>
      </div>
    </div>
  );
};

export default SalesChart; 