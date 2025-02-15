import { Repository } from '@/types/github';

interface Project {
  name: string;
  description: string;
  url: string;
  technologies: string[];
  stars: number;
  forks: number;
}

interface Skill {
  name: string;
  level: string;
  category: string;
}

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  type: 'project' | 'contribution';
}

interface BlogPost {
  title: string;
  url: string;
  publishDate: string;
  platform: string;
}

function formatProjects(repositories: Repository[]): Project[] {
  return repositories
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      technologies: [repo.language, ...Object.keys(repo.dependencies || {})],
      stars: repo.stargazers_count,
      forks: repo.forks_count
    }));
}

function extractSkills(githubData: any): Skill[] {
  const skills: Skill[] = [];
  const technologies = new Map<string, number>();

  githubData.repositories.forEach((repo: Repository) => {
    if (repo.language) {
      const count = technologies.get(repo.language) || 0;
      technologies.set(repo.language, count + 1);
    }
    
    Object.keys(repo.dependencies || {}).forEach(dep => {
      const count = technologies.get(dep) || 0;
      technologies.set(dep, count + 1);
    });
  });

  return Array.from(technologies.entries())
    .map(([name, count]) => ({
      name,
      level: count > 5 ? 'Expert' : count > 3 ? 'Advanced' : 'Intermediate',
      category: name.toLowerCase().includes('react') ? 'Frontend' : 'Backend'
    }));
}

function generateTimeline(githubData: any): TimelineItem[] {
  const timeline: TimelineItem[] = [];

  githubData.repositories.forEach((repo: Repository) => {
    timeline.push({
      date: repo.created_at,
      title: `Created ${repo.name}`,
      description: repo.description || '',
      type: 'project'
    });
  });

  return timeline.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

async function fetchBlogPosts(username: string): Promise<BlogPost[]> {
  // Şimdilik boş dizi döndürüyoruz
  return [];
}

export default async function generatePortfolio(githubData: any) {
  const portfolio = {
    projects: formatProjects(githubData.repositories),
    skills: extractSkills(githubData),
    experience: generateTimeline(githubData),
    blog: await fetchBlogPosts(githubData.login)
  };

  return portfolio;
} 