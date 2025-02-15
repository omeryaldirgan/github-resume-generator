export interface Technology {
  name: string;
  category: TechCategory;
  commits: number;
  repoCount: number;
  lastUsed: Date;
  firstUsed: Date;
  importCount?: number;
  experience?: string;
  percentage: number;
}

export type TechCategory = 
  | 'language'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'testing'
  | 'unknown';

export interface TechAnalysis {
  primaryLanguages: Technology[];
  frameworkExpertise: Technology[];
  devopsCapabilities: Technology[];
  learningTrends: LearningTrend[];
  recommendations: string[];
}

export interface LearningTrend {
  technology: string;
  category: TechCategory;
  activityTimeline: ActivityPoint[];
  growthRate: number;
}

export interface ActivityPoint {
  date: Date;
  commits: number;
  additions: number;
  deletions: number;
}

export interface GitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

export interface StatItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}

export type ViewType = 'default' | 'pills'; 