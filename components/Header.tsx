'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Github,Download } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { fetchGitHubData } from '@/lib/github-api';
import { useResume } from '@/context/ResumeContext';
import ProductHuntBadge from './ProductHuntBadge';

interface Repository {
  name: string;
  stargazers_count: number;
}

export default function Header() {
  const [repoStats, setRepoStats] = useState({ stars: 0 });
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isResumePage = pathname?.startsWith('/resume/') ?? false;
  const isHomePage = pathname === '/';
  const { handleExportPDF, isExporting } = useResume();

  useEffect(() => {
    const fetchRepoStats = async () => {
      try {
        const data = await fetchGitHubData('omeryaldirgan');
        if (data.repositories && data.repositories.length > 0) {
          const mainRepo = data.repositories.find((repo: Repository) => 
            repo.name === 'github-resume-generator'
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
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Github className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="hidden sm:inline-block font-bold text-xl 
                bg-gradient-to-r from-primary-600 to-primary-500 
                dark:from-primary-400 dark:to-primary-500 
                bg-clip-text text-transparent">
                GitHub Resume
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <ProductHuntBadge size="small" className="hidden sm:block" />

            {isResumePage && (
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 group",
                  "bg-gradient-to-r from-primary-600 to-purple-600",
                  "dark:from-primary-500 dark:to-purple-500",
                  "hover:from-primary-500 hover:to-purple-500",
                  "dark:hover:from-primary-400 dark:hover:to-purple-400",
                  "text-white shadow-md hover:shadow-lg",
                  "hover:shadow-primary-500/25 dark:hover:shadow-primary-950/50",
                  "focus:ring-2 focus:ring-primary-500/30 outline-none",
                  isExporting && "opacity-75 cursor-not-allowed"
                )}
              >
                <span className="flex items-center space-x-1.5">
                  <Download size={16} />
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