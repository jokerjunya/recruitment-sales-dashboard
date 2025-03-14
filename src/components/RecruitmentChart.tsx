import { RecruitmentData } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts';

interface RecruitmentChartProps {
  data: RecruitmentData[];
}

interface ExtendedRecruitmentData extends RecruitmentData {
  interviewRate: number;
  offerRate: number;
  hireRate: number;
  overallRate: number;
}

const RecruitmentChart = ({ data }: RecruitmentChartProps) => {
  // 採用コンバージョン率を計算
  const dataWithRates = data.map(item => {
    const interviewRate = item.interviews / item.applicants * 100;
    const offerRate = item.offers / item.interviews * 100;
    const hireRate = item.hires / item.offers * 100;
    const overallRate = item.hires / item.applicants * 100;
    
    return {
      ...item,
      interviewRate,
      offerRate,
      hireRate,
      overallRate
    };
  });

  return (
    <div className="card">
      <h3 className="section-title">月次採用状況</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={dataWithRates}
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
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'interviewRate' || name === 'offerRate' || name === 'hireRate' || name === 'overallRate') {
                  return [`${value.toFixed(1)}%`, 
                    name === 'interviewRate' ? '面接率' : 
                    name === 'offerRate' ? 'オファー率' : 
                    name === 'hireRate' ? '採用率' : '総合採用率'];
                }
                return [value, 
                  name === 'applicants' ? '応募者数' : 
                  name === 'interviews' ? '面接数' : 
                  name === 'offers' ? 'オファー数' : '採用数'];
              }}
              labelFormatter={(label) => `${label}`}
            />
            <Legend 
              formatter={(value) => {
                return value === 'applicants' ? '応募者数' : 
                       value === 'interviews' ? '面接数' : 
                       value === 'offers' ? 'オファー数' : 
                       value === 'hires' ? '採用数' : 
                       value === 'overallRate' ? '総合採用率' : '';
              }}
            />
            <Bar yAxisId="left" dataKey="applicants" fill="#8884d8" name="applicants" />
            <Bar yAxisId="left" dataKey="interviews" fill="#82ca9d" name="interviews" />
            <Bar yAxisId="left" dataKey="offers" fill="#ffc658" name="offers" />
            <Bar yAxisId="left" dataKey="hires" fill="#ff8042" name="hires" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="overallRate"
              stroke="#ff7300"
              name="overallRate"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RecruitmentChart; 