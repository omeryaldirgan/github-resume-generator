import { useGitHubStats } from '@/hooks/useGitHubStats';
import { StatCard } from '@/components/stats/StatCard';
import { useResume } from '@/context/ResumeContext';
import type { GitHubStats } from '@/types/github';

interface UserStatsProps {
  data: GitHubStats;
}

const PINNED_STATS = ['Repositories', 'Followers',"Following","Stars"] as const;

export default function UserStats({ data }: UserStatsProps) {
  const { filters } = useResume();
  const allStats = useGitHubStats(data);
  
  // Stats'ları filtrele
  const stats = filters.statsView.showPinned 
    ? allStats.filter(stat => PINNED_STATS.includes(stat.label as typeof PINNED_STATS[number]))
    : allStats;

  return (
    <section className="card">
      <header className="flex flex-col sm:flex-row items-start sm:items-center 
                         justify-between gap-4 mb-6">
        <h3 className="text-xl font-semibold">GitHub Stats</h3>
      </header>
      
      <div className={`
        ${filters.statsView.viewType === 'pills' 
          ? "flex flex-wrap gap-2 sm:gap-3" 
          : "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"}
      `}>
        {stats.map((stat, index) => (
          <StatCard
            key={`stat-${index}-${stat.label}`}
            stat={stat}
            variant={filters.statsView.viewType === 'pills' ? 'pill' : 'default'}
          />
        ))}
      </div>
    </section>
  );
} 