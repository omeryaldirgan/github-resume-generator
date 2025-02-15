import { Star, GitFork, ExternalLink } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import { Repository } from '@/types/github';

export default function TopRepositories({ data }: { data: any }) {
  const { filters } = useResume();
  
  // Repoları sırala ve filtrele
  const repositories = data.repositories
    ?.sort((a: Repository, b: Repository) => b.stargazers_count - a.stargazers_count)
    .slice(0, filters.reposView.count);

  if (!repositories?.length) {
    return (
      <div className="p-6 text-center text-surface-600">
        No repositories found
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-card">
      <h3 className="text-xl font-semibold mb-4 text-surface-900 dark:text-dark">Top Repositories</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {repositories.map((repo: any) => (
          <div key={repo.id} className="border border-surface-200 dark:border-dark rounded-lg p-4 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
            <div className="flex items-start justify-between">
              <a 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-500 font-medium hover:text-primary-700 dark:hover:text-primary-400 flex items-center"
              >
                {repo.name}
                <ExternalLink size={16} className="ml-1" />
              </a>
              <div className="flex items-center space-x-3 text-surface-600 dark:text-dark-secondary">
                <div className="flex items-center">
                  <Star size={16} className="mr-1" />
                  {repo.stargazers_count}
                </div>
                <div className="flex items-center">
                  <GitFork size={16} className="mr-1" />
                  {repo.forks_count}
                </div>
              </div>
            </div>
            
            {repo.description && (
              <p className="mt-2 text-surface-600 dark:text-dark-secondary text-sm">{repo.description}</p>
            )}

            {repo.language && (
              <div className="mt-3 text-sm">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400">
                  {repo.language}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 