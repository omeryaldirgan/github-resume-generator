'use client';

import { createContext, useContext, useState, useRef } from 'react';

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
  handleExportPDF: () => Promise<void>;
  isExporting: boolean;
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
    showPinned: true,
    viewType: 'default'
  },
  reposView: {
    count: 4,
    showPinned: false,
    showStarred: false
  }
};

export const ResumeContext = createContext<ResumeContextType>({
  filters: defaultFilters,
  setFilters: () => {},
  userData: null,
  setUserData: () => {},
  handleExportPDF: () => Promise.resolve(),
  isExporting: false
});

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState(defaultFilters);
  const [userData, setUserData] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!resumeRef.current || isExporting) return;
    setIsExporting(true);
    
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      
      const cvContent = resumeRef.current.querySelector('.cv-container') as HTMLElement;
      if (!cvContent) return;
      
      document.body.classList.add('print-mode');
      
      const opt = {
        margin: 0,
        filename: `${userData?.name || userData?.login}-resume.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 1.0
        },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: 794, // A4 genişliği
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true,
        },
        pagebreak: { mode: 'avoid-all' }
      };

      await html2pdf().from(cvContent).set(opt).save();
      
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      document.body.classList.remove('print-mode');
      setIsExporting(false);
    }
  };

  return (
    <ResumeContext.Provider value={{ 
      filters, 
      setFilters, 
      userData, 
      setUserData,
      handleExportPDF,
      isExporting
    }}>
      <div ref={resumeRef}>
        {children}
      </div>
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