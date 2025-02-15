'use client';

import { useState } from 'react';
import Image from 'next/image'
import { Search, ArrowRight, Users, GitFork } from 'lucide-react';
import { useRouter } from 'next/navigation';
import resumeImage from '@/assets/illustration-dashboard.webp'
import { cn } from '@/lib/utils';

export default function MainContent() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateResume = async () => {
    if (!username || loading) return;
    setLoading(true);
    setError(null);

    try {
      router.push(`/resume/${username}`);
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center 
      bg-gradient-to-b from-surface-50 to-surface-100 
      dark:from-slate-950 dark:to-slate-900
      dark:bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]
      dark:from-primary-950/30 dark:via-slate-950 dark:to-slate-950
    ">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full text-sm font-medium 
                  bg-primary-50 text-primary-600 
                  dark:bg-slate-800/80 dark:text-primary-300
                  dark:ring-1 dark:ring-primary-500/30 dark:shadow-lg dark:shadow-primary-950/20
                ">
                  ✨ Your GitHub Profile, Reimagined
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-3 
                bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent
                dark:from-primary-300 dark:to-purple-300
                leading-tight tracking-tight
              ">
                GitHub Resume Generator
              </h1>
              <p className="text-surface-600/90 dark:text-slate-400 text-base leading-relaxed max-w-md">
                Transform your GitHub journey into a professional resume in seconds
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/50 shadow-xl rounded-2xl p-8 
              border border-surface-200/50 
              dark:border-slate-800 
              dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]
              dark:backdrop-blur-xl dark:backdrop-brightness-110
              backdrop-blur-sm
            ">
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateResume()}
                  placeholder="Enter GitHub Username"
                  className="w-full px-6 py-4 text-lg rounded-xl 
                    border-2 border-surface-200 
                    dark:border-slate-700/50 dark:bg-slate-900/90
                    dark:text-slate-200 dark:placeholder:text-slate-500
                    focus:border-primary-500 dark:focus:border-primary-500 
                    focus:ring-4 focus:ring-primary-500/20
                    dark:shadow-inner dark:shadow-slate-950/50
                    transition-all duration-200 pl-12"
                />
                <Search 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-400 dark:text-slate-500" 
                  size={24} 
                />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-surface-500 dark:text-slate-500 text-sm">
                  Popular profiles: <code className="text-primary-600 dark:text-primary-400/90">torvalds</code>, 
                  <code className="text-primary-600 dark:text-primary-400/90">gaearon</code>
                </p>
                <button 
                  onClick={handleGenerateResume}
                  disabled={loading || !username}
                  className={cn(
                    "relative px-8 py-3 text-lg font-medium rounded-xl transition-all duration-300 group",
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
                  <span className="flex items-center space-x-2">
                    {loading ? (
                      <>
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Resume</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                      </>
                    )}
                  </span>
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 
                  bg-red-50 dark:bg-red-950/30 
                  text-red-600 dark:text-red-400 
                  rounded-xl text-center 
                  border border-red-100 dark:border-red-900/50
                  dark:shadow-inner dark:shadow-red-950/20"
                >
                  {error}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 
                bg-white/80 dark:bg-slate-900/50 
                rounded-xl border border-surface-200/50 
                dark:border-slate-800/90 
                dark:hover:border-primary-700/50 
                hover:shadow-lg dark:shadow-lg
                dark:shadow-slate-950/20
                transition-all duration-300 backdrop-blur-sm
                group hover:-translate-y-0.5"
              >
                <div className="text-primary-600 dark:text-primary-400/90 mb-2.5 
                  transition-transform duration-300 group-hover:scale-110"
                >
                  <Users size={20} />
                </div>
                <h3 className="text-base font-semibold text-surface-900 dark:text-slate-200 mb-1.5">
                  Technical Excellence
                </h3>
                <p className="text-sm text-surface-600/90 dark:text-slate-400/90 leading-relaxed">
                  Automated analysis of your technical skills and project achievements
                </p>
              </div>
              <div className="p-6 
                bg-white/80 dark:bg-slate-900/50 
                rounded-xl border border-surface-200/50 
                dark:border-slate-800/90 
                dark:hover:border-primary-700/50 
                hover:shadow-lg dark:shadow-lg
                dark:shadow-slate-950/20
                transition-all duration-300 backdrop-blur-sm
                group hover:-translate-y-0.5"
              >
                <div className="text-purple-600 dark:text-purple-400 mb-2.5
                  transition-transform duration-300 group-hover:scale-110"
                >
                  <GitFork size={20} />
                </div>
                <h3 className="text-base font-semibold text-surface-900 dark:text-slate-200 mb-1.5">
                  Impact & Contributions
                </h3>
                <p className="text-sm text-surface-600/90 dark:text-slate-400/90 leading-relaxed">
                  Visualize your open source contributions with detailed metrics
                </p>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 
                bg-gradient-to-r from-primary-600/20 to-purple-600/20 
                dark:from-primary-500/5 dark:to-purple-500/5 
                rounded-3xl blur-3xl" 
              />
              <Image 
                src={resumeImage}
                alt="Resume Generation"
                width={500}
                height={500}
                priority
                className="relative dark:opacity-85 dark:contrast-110 dark:brightness-95 
                  hover:scale-105 transition-transform duration-500
                  dark:drop-shadow-[0_5px_15px_rgba(59,130,246,0.15)]"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 