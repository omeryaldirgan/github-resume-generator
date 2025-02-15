import { analyzeTechnologies } from '@/lib/tech-analysis';

interface Technology {
  name: string;
  percentage: number;
  commits: number;
  experience: string;
  lastUsed: Date;
  category: 'language' | 'framework';
}

interface Repository {
  language: string;
  created_at: string;
  pushed_at: string;
  commits: number;
  dependencies?: Record<string, string>;
}

export default function TechStack({ repositories }: { repositories: Repository[] }) {
  // Repolardaki dilleri ve teknolojileri analiz et
  const techStack = analyzeTechnologies(repositories);
  
  return (
    <div className="tech-stack-grid">
      {techStack.allTechnologies.map(tech => (
        <TechBadge key={tech.name} technology={tech} />
      ))}
    </div>
  );
}

// TechBadge bileşeni aynı dosyada tanımlanabilir
function TechBadge({ technology }: { technology: Technology }) {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg bg-surface-50 dark:bg-dark-card">
      <span className="text-sm font-medium">{technology.name}</span>
      <span className="text-xs text-surface-600 dark:text-dark-secondary">
        {technology.percentage.toFixed(1)}%
      </span>
    </div>
  );
} 