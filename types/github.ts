import { ReactNode } from 'react';

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  pushed_at: string;
  commits: number;
  languages: Record<string, number>;
  dependencies?: Record<string, string>;
}

export interface Technology {
  name: string;
  percentage: number;
  commits: number;
  experience: string;
  lastUsed: Date;
  firstUsed: Date;
  category: TechCategory;
  repoCount?: number;
  importCount?: number;
}

export type TechCategory = 'language' | 'framework' | 'tool' | 'database';

export interface TechAnalysis {
  topTechnologies: Technology[];
  allTechnologies: Technology[];
  languageDistribution: Technology[];
  frameworkUsage: Technology[];
  primaryLanguages: Technology[];
  frameworkExpertise: Technology[];
  devopsCapabilities: Technology[];
  learningTrends: LearningTrend[];
  recommendations: string[];
}

export interface GitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  total_commits?: number;
  total_prs?: number;
  total_issues?: number;
}

export interface StatItem {
  label: string;
  value: number;
  icon: ReactNode;
  color?: string;
}

export interface Contribution {
  type: 'commit' | 'pr' | 'issue';
  title: string;
  date: string;
  repo: string;
  url: string;
  merged?: boolean;
}

export interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  bio?: string;
  location?: string;
  company?: string;
  blog?: string;
  twitter_username?: string;
  email?: string;
  created_at: string;
  updated_at: string;
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

export type ViewType = 'default' | 'pills'; 