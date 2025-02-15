'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Github, ArrowLeft, Download } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { fetchGitHubData } from '@/lib/github-api';
import { useResume } from '@/context/ResumeContext';

interface Repository {
  name: string;
  stargazers_count: number;
}

export default function Header() {
  const [repoStats, setRepoStats] = useState({ stars: 0 });
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isResumePage = pathname?.startsWith('/resume/') ?? false;
  const { handleExportPDF, isExporting } = useResume();

  useEffect(() => {
    const fetchRepoStats = async () => {
      try {
        const data = await fetchGitHubData('omeryaldirgan');
        if (data.repositories && data.repositories.length > 0) {
          const mainRepo = data.repositories.find((repo: Repository) => 
            repo.name === 'github-resume'
          );
          if (mainRepo) {
            setRepoStats({ stars: mainRepo.stargazers_count });
          }
        }
      } catch (error) {
        console.error('Error fetching repo stats:', error);
      }
    };

    fetchRepoStats();
  }, []);

  return (
    <header className="h-16 border-b border-surface-200/50 dark:border-slate-800/50 
      bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50
      dark:shadow-[0_2px_10px_-2px_rgba(0,0,0,0.3)]"
    >
      <div className="container mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            {isResumePage ? (
              <Link 
                href="/" 
                className="text-surface-600 dark:text-dark-secondary hover:text-surface-900 dark:hover:text-dark"
              >
                <ArrowLeft size={20} />
              </Link>
            ) : null}
            
            <Link href="/" className="flex items-center space-x-3">
              <Github className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-semibold text-surface-900 dark:text-dark">
                GitHub Resume
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isResumePage && (
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className={cn(
                  "relative px-6 py-2 text-base font-medium rounded-xl transition-all duration-300 group",
                  "bg-gradient-to-r from-primary-600 to-purple-600",
                  "dark:from-primary-500 dark:to-purple-500",
                  "hover:from-primary-500 hover:to-purple-500",
                  "dark:hover:from-primary-400 dark:hover:to-purple-400",
                  "text-white shadow-lg hover:shadow-xl",
                  "hover:shadow-primary-500/25 dark:hover:shadow-primary-950/50",
                  "focus:ring-4 focus:ring-primary-500/30 outline-none",
                  isExporting && "opacity-75 cursor-not-allowed"
                )}
              >
                <span className="flex items-center space-x-2">
                  <Download size={18} />
                  <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
                </span>
              </button>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-slate-800/50 
                transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <Sun className="text-slate-400 hover:text-slate-200" size={20} />
              ) : (
                <Moon className="text-surface-600 hover:text-surface-900" size={20} />
              )}
            </button>

            <Link 
              href="https://github.com/omeryaldirgan/github-resume-generator" 
              target="_blank"
              className="flex items-center space-x-2 text-surface-600 dark:text-slate-400 
                hover:text-primary-600 dark:hover:text-primary-400 
                transition-colors duration-200"
            >
              <Github size={20} />
              <span className="font-medium">{repoStats.stars}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 