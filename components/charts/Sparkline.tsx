import { Line } from 'react-chartjs-2';
import { ActivityPoint } from '@/types/github';

interface SparklineProps {
  data: ActivityPoint[];
}

export function Sparkline({ data }: SparklineProps) {
  const chartData = {
    labels: data.map(point => point.date),
    datasets: [{
      data: data.map(point => point.commits),
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.4,
      fill: false
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } }
  };

  return (
    <div className="h-12">
      <Line data={chartData} options={options} />
    </div>
  );
} 