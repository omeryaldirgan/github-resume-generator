'use client';

import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const isRateLimit = error.message.includes('rate limit');

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
            rounded-2xl bg-amber-50 dark:bg-amber-950/30 
            text-amber-500 dark:text-amber-400
            ring-1 ring-amber-500/20 dark:ring-amber-400/20"
          >
            <AlertCircle size={36} />
          </div>

          <h1 className="text-3xl font-bold
            bg-gradient-to-r from-amber-600 to-orange-600 
            dark:from-amber-400 dark:to-orange-400 
            bg-clip-text text-transparent"
          >
            {isRateLimit ? 'Rate Limit Exceeded' : 'Something went wrong'}
          </h1>

          <div className="space-y-2">
            <p className="text-surface-600 dark:text-slate-400 max-w-md mx-auto">
              {isRateLimit 
                ? "You've hit GitHub's API rate limit. Please wait a few minutes and try again."
                : "We couldn't fetch the GitHub profile data. Please try again later."}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 text-base font-medium 
                text-white bg-gradient-to-r from-amber-600 to-orange-600
                hover:from-amber-500 hover:to-orange-500
                dark:from-amber-500 dark:to-orange-500
                dark:hover:from-amber-400 dark:hover:to-orange-400
                rounded-xl transition-all duration-300
                hover:shadow-lg hover:shadow-amber-500/25 dark:hover:shadow-amber-500/15
                hover:-translate-y-0.5
                ring-1 ring-amber-500/50 dark:ring-amber-400/50"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>

            <button
              onClick={reset}
              className="inline-flex items-center px-6 py-3 text-base font-medium 
                text-amber-700 dark:text-amber-300
                bg-amber-50 dark:bg-amber-950/30
                hover:bg-amber-100 dark:hover:bg-amber-950/50
                rounded-xl transition-all duration-300
                hover:shadow-lg hover:-translate-y-0.5
                ring-1 ring-amber-500/50 dark:ring-amber-400/50"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 