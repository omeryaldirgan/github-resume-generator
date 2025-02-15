import { Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="h-16 border-t border-surface-200/50 dark:border-slate-800/50 
      bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm
      relative z-10
      dark:shadow-[0_-2px_10px_-2px_rgba(0,0,0,0.3)]"
    >
      <div className="container mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-1 text-sm text-surface-600/90 dark:text-slate-400">
            <span>Built with</span>
            <a 
              href="https://nextjs.org" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400/90 
                dark:hover:text-primary-300/90 transition-colors px-1"
            >
              Next.js
            </a>
            <span>&</span>
            <a 
              href="https://tailwindcss.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-500 dark:text-purple-400/90 
                dark:hover:text-purple-300/90 transition-colors px-1"
            >
              Tailwind CSS
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/omeryaldirgan/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-surface-600/75 hover:text-surface-900 
                dark:text-slate-400/75 dark:hover:text-slate-200
                transition-colors duration-200
                hover:scale-110 transform"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 fill-current"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/omeryaldirgan/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-surface-600/75 hover:text-surface-900 
                dark:text-slate-400/75 dark:hover:text-slate-200
                transition-colors duration-200
                hover:scale-110 transform"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 