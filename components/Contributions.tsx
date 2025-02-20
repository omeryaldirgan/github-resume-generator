import { useResume } from '@/context/ResumeContext';
import { GitCommit, GitPullRequest, GitMerge, Calendar } from 'lucide-react';
import { useState } from 'react';

type Contribution = {
  type: string;
  title: string;
  date: string;
  repo: string;
  url: string;
  merged?: boolean;
};

export default function Contributions({ data }: { data: any }) {
  const { filters } = useResume();
  const [showAll, setShowAll] = useState(false);

  // Veri kontrolü
  if (!data?.contributions || !data?.stats) {
    return (
      <div className="p-6 text-center text-surface-600">
        No contribution data available
      </div>
    );
  }

  const contributions = data.contributions
    .filter((contribution: Contribution) => {
      if (filters.showOnlyMergedPRs && contribution.type === 'pr') {
        return contribution.merged;
      }
      return true;
    })
    .slice(0, showAll ? undefined : filters.contributionCount);

  const remainingCount = data.contributions.length - filters.contributionCount;

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-card mb-8">
      <h3 className="text-xl font-semibold mb-6 text-surface-900 dark:text-dark">Recent Contributions</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg border border-surface-200 dark:border-dark">
          <div className="text-2xl font-bold text-green-500">{data.stats.commits || 0}</div>
          <div className="text-sm text-surface-600 dark:text-dark-secondary mt-1">Total Commits</div>
        </div>
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg border border-surface-200 dark:border-dark">
          <div className="text-2xl font-bold text-purple-500">{data.stats.pullRequests || 0}</div>
          <div className="text-sm text-surface-600 dark:text-dark-secondary mt-1">Pull Requests</div>
        </div>
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg border border-surface-200 dark:border-dark">
          <div className="text-2xl font-bold text-blue-500">{data.stats.issues || 0}</div>
          <div className="text-sm text-surface-600 dark:text-dark-secondary mt-1">Issues Created</div>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {contributions.map((contribution: Contribution, index: number) => (
          <div 
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            {contribution.type === 'commit' && (
              <GitCommit className="text-green-500 shrink-0 mt-1" size={18} />
            )}
            {contribution.type === 'pr' && (
              contribution.merged ? (
                <GitMerge className="text-purple-500 shrink-0 mt-1" size={18} />
              ) : (
                <GitPullRequest className="text-blue-500 shrink-0 mt-1" size={18} />
              )
            )}
            
            <div className="flex-1 min-w-0">
              <a 
                href={contribution.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface-900 dark:text-dark hover:text-primary-600 dark:hover:text-primary-500 font-medium block truncate"
              >
                {contribution.title}
              </a>
              <div className="flex items-center mt-1 text-sm text-surface-600 dark:text-dark-secondary space-x-2">
                <span>{contribution.repo}</span>
                <span>•</span>
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {new Date(contribution.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Graph */}
      {data.contributions.length > 0 && (
        <div className="mt-8 p-6 border border-surface-200 dark:border-dark rounded-lg">
          <h4 className="text-sm font-medium text-surface-900 dark:text-dark mb-4">Activity Graph</h4>
          <div className="h-32 flex items-end space-x-1">
            {data.contributions.slice(0, 52).map((contribution: Contribution, i: number) => (
              <div
                key={i}
                className="flex-1 bg-primary-100 dark:bg-primary-900/20 hover:bg-primary-200 dark:hover:bg-primary-800/30 transition-colors duration-150 rounded tooltip"
                style={{
                  height: `${30 + Math.random() * 70}%`,
                }}
                title={new Date(contribution.date).toLocaleDateString()}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-surface-500 dark:text-dark-secondary">
            <span>Recent Activity</span>
            <span>Now</span>
          </div>
        </div>
      )}

      {filters.showAndMore && remainingCount > 0 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 text-sm font-medium"
        >
          and {remainingCount} more contributions...
        </button>
      )}
    </div>
  );
} 