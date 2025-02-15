import { Line, Bar, Radar } from 'react-chartjs-2';

export default function ContributionGraphs({ data }: { data: any }) {
  return (
    <div className="graphs-container">
      <div className="activity-heatmap">
        {/* Commit aktivite haritası */}
      </div>
      <div className="language-distribution">
        {/* Dil dağılım grafiği */}
      </div>
      <div className="contribution-timeline">
        {/* Zaman çizelgesi grafiği */}
      </div>
    </div>
  );
} 