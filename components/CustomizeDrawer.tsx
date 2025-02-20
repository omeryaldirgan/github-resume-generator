'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function CustomizeDrawer({ isOpen, onClose, children }: CustomizeDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden",
          "transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white dark:bg-slate-900",
          "z-50 lg:hidden shadow-2xl",
          "transform transition-transform duration-300 ease-in-out",
          "overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 
          bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm
          border-b border-surface-200/50 dark:border-slate-800/50"
        >
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
            Customize Introduction
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-slate-800
              text-surface-600 dark:text-slate-400
              transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {children}
        </div>
      </div>
    </>
  );
} 