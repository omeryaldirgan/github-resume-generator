interface Technology {
  name: string;
  category: 'language' | 'framework';
  commits: number;
  percentage: number;
  experience: 'Beginner' | 'Intermediate' | 'Expert';
  lastUsed: Date;
}

export function analyzeTechnologies(repositories: any[]) {
  const technologies: Record<string, Technology> = {};
  
  repositories.forEach(repo => {
    // Dil analizi
    if (repo.language) {
      if (!technologies[repo.language]) {
        technologies[repo.language] = {
          name: repo.language,
          percentage: 0,
          commits: 0,
          experience: calculateExperience(repo.created_at, repo.language),
          lastUsed: new Date(repo.pushed_at),
          category: 'language'
        };
      }
      technologies[repo.language].commits += repo.commits || 0;
    }

    // Package.json analizi
    const dependencies = extractDependencies(repo);
    dependencies.forEach(dep => {
      if (!technologies[dep]) {
        technologies[dep] = {
          name: dep,
          percentage: 0,
          commits: 0,
          experience: 'Intermediate',
          lastUsed: new Date(repo.pushed_at),
          category: 'framework'
        };
      }
    });
  });

  // Yüzdeleri hesapla
  const totalCommits = Object.values(technologies)
    .reduce((sum, tech) => sum + tech.commits, 0);
  
  Object.values(technologies).forEach(tech => {
    tech.percentage = (tech.commits / totalCommits) * 100;
  });

  return {
    topTechnologies: getTopTechnologies(technologies),
    allTechnologies: Object.values(technologies),
    languageDistribution: getLanguageDistribution(technologies),
    frameworkUsage: getFrameworkUsage(technologies)
  };
}

export function getTechBadgeColor(category: string) {
  switch (category) {
    case 'language':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
    case 'framework':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
    case 'tool':
      return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    default:
      return 'bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-dark-secondary';
  }
}

export function getExperiencePercentage(experience: string) {
  switch (experience) {
    case 'Beginner': return 25;
    case 'Intermediate': return 50;
    case 'Advanced': return 75;
    case 'Expert': return 100;
    default: return 0;
  }
}

function calculateExperience(firstUsed: string, language: string): 'Beginner' | 'Intermediate' | 'Expert' {
  const years = (new Date().getTime() - new Date(firstUsed).getTime()) / (1000 * 60 * 60 * 24 * 365);
  
  if (years > 5) return 'Expert';
  if (years > 3) return 'Expert';
  if (years > 1) return 'Intermediate';
  return 'Beginner';
}

function extractDependencies(repo: any): string[] {
  const deps = new Set<string>();
  
  if (repo.dependencies) {
    Object.keys(repo.dependencies).forEach(dep => deps.add(dep));
  }
  
  return Array.from(deps);
}

function getTopTechnologies(technologies: Record<string, Technology>) {
  return Object.values(technologies)
    .sort((a, b) => b.commits - a.commits)
    .slice(0, 8);
}

function getLanguageDistribution(technologies: Record<string, Technology>) {
  return Object.values(technologies)
    .filter(tech => tech.category === 'language')
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);
}

function getFrameworkUsage(technologies: Record<string, Technology>) {
  return Object.values(technologies)
    .filter(tech => tech.category === 'framework')
    .sort((a, b) => b.commits - a.commits)
    .slice(0, 8);
} 