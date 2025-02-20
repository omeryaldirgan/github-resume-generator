'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-dark">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white">404</h1>
        <h2 className="text-xl text-surface-700 dark:text-slate-300">
          GitHub user not found
        </h2>
        <p className="text-surface-600 dark:text-slate-400 max-w-md">
          The GitHub user you're looking for doesn't exist or might have been deleted.
        </p>
        <Link 
          href="/"
          className={cn(
            "relative inline-flex items-center space-x-2",
            "px-8 py-3 text-lg font-medium rounded-xl transition-all duration-300 group",
            "bg-gradient-to-r from-primary-600 to-purple-600",
            "dark:from-primary-500 dark:to-purple-500",
            "hover:from-primary-500 hover:to-purple-500",
            "dark:hover:from-primary-400 dark:hover:to-purple-400",
            "text-white shadow-lg hover:shadow-xl",
            "hover:shadow-primary-500/25 dark:hover:shadow-primary-950/50",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
            "focus:ring-4 focus:ring-primary-500/30 outline-none"
          )}
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
} 