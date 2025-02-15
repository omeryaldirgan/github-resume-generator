import { useMemo } from 'react';
import React from 'react';
import { Users, Star, GitFork, Book } from 'lucide-react';
import { GitHubStats, StatItem } from '@/types/github';

export function useGitHubStats(data: GitHubStats): StatItem[] {
  return useMemo(() => [
    {
      label: 'Followers',
      value: data.followers || 0,
      icon: React.createElement(Users, { size: 20 }),
      color: 'primary'
    },
    {
      label: 'Following',
      value: data.following || 0,
      icon: React.createElement(Users, { size: 20 }),
      color: 'secondary'
    },
    {
      label: 'Repositories',
      value: data.public_repos || 0,
      icon: React.createElement(Book, { size: 20 }),
      color: 'success'
    },
    {
      label: 'Gists',
      value: data.public_gists || 0,
      icon: React.createElement(Star, { size: 20 }),
      color: 'warning'
    }
  ], [data]);
} 