import { useMemo } from 'react';
import React from 'react';
import { Users, Star, GitFork, Book } from 'lucide-react';
import type { StatItem, StatColor } from '@/components/stats/StatCard';

export function useGitHubStats(data: any): StatItem[] {
  return useMemo(() => [
    {
      label: 'Followers',
      value: data.followers || 0,
      icon: React.createElement(Users, { size: 20 }),
      color: 'primary' as StatColor
    },
    {
      label: 'Following',
      value: data.following || 0,
      icon: React.createElement(Users, { size: 20 }),
      color: 'secondary' as StatColor
    },
    {
      label: 'Repositories',
      value: data.public_repos || 0,
      icon: React.createElement(Book, { size: 20 }),
      color: 'success' as StatColor
    },
    {
      label: 'Stars',
      value: data.public_gists || 0,
      icon: React.createElement(Star, { size: 20 }),
      color: 'warning' as StatColor
    }
  ], [data]);
} 