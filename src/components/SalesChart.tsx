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
  ComposedChart
} from 'recharts';

interface SalesChartProps {
  data: SalesData[];
}

const SalesChart = ({ data }: SalesChartProps) => {
  return (
    <div className="card">
      <h3 className="section-title">月次売上推移</h3>
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
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'yoyGrowth' || name === 'momGrowth') {
                  return [`${value}%`, name === 'yoyGrowth' ? '前年同月比' : '前月比'];
                }
                return [value, name === 'unitA' ? '事業部A' : name === 'unitB' ? '事業部B' : name === 'unitC' ? '事業部C' : '合計'];
              }}
              labelFormatter={(label) => `${label}`}
            />
            <Legend 
              formatter={(value) => {
                return value === 'unitA' ? '事業部A' : 
                       value === 'unitB' ? '事業部B' : 
                       value === 'unitC' ? '事業部C' : 
                       value === 'total' ? '合計' : 
                       value === 'yoyGrowth' ? '前年同月比' : '前月比';
              }}
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
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="momGrowth"
              stroke="#387908"
              name="momGrowth"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart; 