import Link from 'next/link';
import { ArrowLeft, GitBranch } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center 
      bg-gradient-to-b from-surface-50 to-surface-100 
      dark:from-slate-950 dark:to-slate-900
      dark:bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]
      dark:from-primary-950/30 dark:via-slate-950 dark:to-slate-950"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 
            rounded-2xl bg-red-50 dark:bg-red-950/30 
            text-red-500 dark:text-red-400
            ring-1 ring-red-500/20 dark:ring-red-400/20"
          >
            <GitBranch size={36} />
          </div>

          <h1 className="text-7xl font-bold
            bg-gradient-to-r from-red-600 to-orange-600 
            dark:from-red-400 dark:to-orange-400 
            bg-clip-text text-transparent"
          >
            404
          </h1>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-surface-900 dark:text-white">
              Profile Not Found
            </h2>

            <p className="text-surface-600 dark:text-slate-400 max-w-md mx-auto">
              The GitHub profile you're looking for doesn't exist or is not accessible.
              Please check the username and try again.
            </p>
          </div>

          <Link 
            href="/"
            className="inline-flex items-center px-8 py-4 text-base font-medium 
              text-white bg-gradient-to-r from-red-600 to-orange-600
              hover:from-red-500 hover:to-orange-500
              dark:from-red-500 dark:to-orange-500
              dark:hover:from-red-400 dark:hover:to-orange-400
              rounded-xl transition-all duration-300
              hover:shadow-lg hover:shadow-red-500/25 dark:hover:shadow-red-500/15
              hover:-translate-y-0.5
              ring-1 ring-red-500/50 dark:ring-red-400/50"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
} 