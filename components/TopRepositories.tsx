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
      <h3 className="text-xl font-semibold mb-4 text-surface-900 dark:text-white">
        Top Repositories
      </h3>
      
      <div className="repos-grid">
        {repositories.map((repo: Repository) => (
          <div key={repo.id} className="repo-card">
            <div className="flex items-center gap-2">
              <a 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-primary-600 dark:text-primary-400 hover:underline"
              >
                <span className="repo-title inline-flex items-center text-primary-600 dark:text-primary-400">
                  {repo.name}
                </span>
              </a>
              <a 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            
            <p className="repo-description">{repo.description || 'No description provided.'}</p>
            
            {repo.languages && (
              <div className="flex flex-wrap gap-2 mt-3 mb-4">
                {Object.keys(repo.languages).map(lang => (
                  <span 
                    key={lang}
                    className="px-2 py-1 text-xs rounded-full bg-surface-100 dark:bg-slate-800 
                             text-surface-700 dark:text-slate-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            )}
            
            <div className="repo-meta">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork size={14} />
                <span>{repo.forks_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 