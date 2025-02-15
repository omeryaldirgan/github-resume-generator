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
    <div className="card section-spacing">
      <h3 className="text-xl font-semibold mb-4">Top Repositories</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {repositories.map((repo: any) => (
          <div key={repo.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <a 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 font-medium 
                         hover:underline flex items-center gap-1 text-sm sm:text-base"
              >
                {repo.name}
                <ExternalLink size={14} className="shrink-0" />
              </a>
              
              <div className="flex items-center gap-3 text-surface-600 dark:text-dark-secondary text-sm">
                <div className="flex items-center gap-1">
                  <Star size={14} className="shrink-0" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork size={14} className="shrink-0" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
            </div>
            
            {repo.description && (
              <p className="mt-2 text-sm text-surface-600 dark:text-dark-secondary line-clamp-2">
                {repo.description}
              </p>
            )}

            {repo.language && (
              <div className="mt-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                               bg-primary-50 dark:bg-primary-900/20 
                               text-primary-700 dark:text-primary-400">
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