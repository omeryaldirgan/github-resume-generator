'use client';

import { createContext, useContext, useState } from 'react';

type ResumeTheme = 'modern' | 'classic' | 'minimal' | 'creative';

type ResumeFilters = {
  showBio: boolean;
  showLocation: boolean;
  showCompany: boolean;
  showJoinedYear: boolean;
  showAvatar: boolean;
  repoCount: number;
  showPinnedOnly: boolean;
  contributionCount: number;
  showAndMore: boolean;
  showOnlyMergedPRs: boolean;
  pillsView: boolean;
  pillsStyle?: 'default' | 'rounded' | 'square';
  theme: ResumeTheme;
  accentColor: string;
  statsView: {
    count: number;
    showPinned: boolean;
    viewType: 'default' | 'pills'
  };
  reposView: {
    count: number;
    showPinned: boolean;
    showStarred: boolean;
  };
};

type ResumeContextType = {
  filters: ResumeFilters;
  setFilters: (filters: ResumeFilters) => void;
  userData: any;
  setUserData: (data: any) => void;
};

const defaultFilters: ResumeFilters = {
  showBio: true,
  showLocation: true,
  showCompany: true,
  showJoinedYear: true,
  showAvatar: true,
  repoCount: 6,
  showPinnedOnly: true,
  contributionCount: 5,
  showAndMore: true,
  showOnlyMergedPRs: false,
  pillsView: false,
  pillsStyle: 'default',
  theme: 'modern',
  accentColor: '#0366d6',
  statsView: {
    count: 6,
    showPinned: false,
    viewType: 'default'
  },
  reposView: {
    count: 6,
    showPinned: false,
    showStarred: false
  }
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<ResumeFilters>(defaultFilters);
  const [userData, setUserData] = useState<any>(null);

  return (
    <ResumeContext.Provider value={{ filters, setFilters, userData, setUserData }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
} 