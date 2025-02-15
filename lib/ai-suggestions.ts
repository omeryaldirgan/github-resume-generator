interface GitHubData {
  repositories: any[];
  contributions: any[];
  stats: {
    commits: number;
    pullRequests: number;
    issues: number;
  };
}

interface AIRecommendations {
  skillGaps: string[];
  projectIdeas: string[];
  careerPath: string[];
  learningResources: string[];
}

function analyzeSkillGaps(githubData: GitHubData): string[] {
  const currentSkills = new Set<string>();
  
  // Repolardaki dilleri analiz et
  githubData.repositories.forEach(repo => {
    if (repo.language) {
      currentSkills.add(repo.language);
    }
    if (repo.dependencies) {
      Object.keys(repo.dependencies).forEach(dep => currentSkills.add(dep));
    }
  });

  // Popüler teknolojileri kontrol et
  const popularTechnologies = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
    'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'Next.js'
  ];

  return popularTechnologies.filter(tech => !currentSkills.has(tech));
}

function generateProjectSuggestions(githubData: GitHubData): string[] {
  const currentSkills = new Set<string>();
  githubData.repositories.forEach(repo => {
    if (repo.language) currentSkills.add(repo.language);
  });

  const suggestions = [
    'Build a personal portfolio website',
    'Create a full-stack web application',
    'Develop a mobile app using React Native',
    'Contribute to open source projects',
    'Build a CLI tool for developers'
  ];

  return suggestions;
}

function recommendCareerPath(githubData: GitHubData): string[] {
  const commitCount = githubData.stats.commits;
  const prCount = githubData.stats.pullRequests;
  
  const paths = [
    'Full Stack Development',
    'Frontend Development',
    'Backend Development',
    'DevOps Engineering',
    'Software Architecture'
  ];

  return paths;
}

function suggestLearningMaterials(githubData: GitHubData): string[] {
  return [
    'Udemy - Modern Web Development',
    'Frontend Masters - JavaScript Path',
    'AWS Certified Developer Course',
    'Docker and Kubernetes Workshop',
    'System Design Interview Preparation'
  ];
}

export async function getAIRecommendations(githubData: GitHubData): Promise<AIRecommendations> {
  const suggestions = {
    skillGaps: analyzeSkillGaps(githubData),
    projectIdeas: generateProjectSuggestions(githubData),
    careerPath: recommendCareerPath(githubData),
    learningResources: suggestLearningMaterials(githubData)
  };

  return suggestions;
} 