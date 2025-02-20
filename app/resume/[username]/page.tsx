'use client';

import Contributions from '@/components/Contributions';
import CustomizePanel from '@/components/CustomizePanel';
import TechnologyInsights from '@/components/TechnologyInsights';
import TopRepositories from '@/components/TopRepositories';
import UserStats from '@/components/UserStats';
import { useResume } from '@/context/ResumeContext';
import { fetchGitHubData } from '@/lib/github-api';
import { Building2, Calendar, Link as LinkIcon, Mail, MapPin, Twitter } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import CustomizeDrawer from '@/components/CustomizeDrawer';
import { cn } from '@/lib/utils';

export default function ResumePage() {
  const params = useParams();
  const router = useRouter();
  const username = params?.username as string;
  const { filters, userData, setUserData, setFilters } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError('User not found');
            router.push('/404');
            return;
          }
          throw new Error('Failed to fetch user data');
        }

        const userData = await fetchGitHubData(username);
        if (!userData) {
          setError('Failed to fetch user data');
          router.push('/404');
          return;
        }

        setUserData(userData);
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred');
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, router]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-dark">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <div className="text-surface-600 dark:text-dark-secondary">
            Loading {username}'s profile...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // 404 sayfasına yönlendirilecek
  }

  const customizeContent = (
    <div className="space-y-8">
      {/* Introduction Settings */}
      <div>
        <h3 className="resume-subsection-title text-surface-800 dark:text-dark mb-4">Customize Introduction</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={filters.showBio}
              onChange={(e) => setFilters({ ...filters, showBio: e.target.checked })}
              className="w-4 h-4 rounded border-surface-300 dark:border-dark text-primary-600 focus:ring-primary-500 dark:bg-dark-card dark:checked:bg-primary-600 dark:checked:border-primary-600"
            />
            <span className="resume-text text-surface-700 dark:text-dark-secondary">Show Bio</span>
          </label>
          {/* Diğer filtreler */}
        </div>
      </div>

      {/* Stats Settings */}
      <div>
        <h3 className="resume-subsection-title text-surface-800 dark:text-dark mb-4">Stats & Repositories</h3>
        <div className="space-y-3">
          {/* Stats filtreleri */}
        </div>
      </div>
    </div>
  );

  return (
    <div className="layout-container">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sol Taraf - Desktop için Panel */}
          <div className="order-2 md:order-1 md:w-80 no-print hidden lg:block">
            <CustomizePanel />
          </div>

          {/* Sağ Taraf - CV İçeriği */}
          <div className="order-1 md:order-2 md:flex-1">
            <div 
              ref={resumeRef}
              className="cv-container"
              style={{ maxWidth: '210mm' }}
            >
              <div className="p-4 sm:p-6 md:p-8 lg:p-[12mm] min-h-screen md:min-h-[297mm]">
                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 pb-6 
                                border-b border-surface-200 dark:border-dark">
                  {filters.showAvatar && (
                    <img
                      src={userData.avatar_url}
                      alt={userData.name || userData.login}
                      className="w-16 h-16 sm:w-24 sm:h-24 rounded-full 
                               ring-2 ring-surface-200 dark:ring-dark"
                    />
                  )}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-surface-900 dark:text-dark">
                      {userData.name || userData.login}
                    </h2>
                    <p className="text-surface-600 dark:text-dark-secondary">@{userData.login}</p>
                    
                    {filters.showBio && userData.bio && (
                      <p className="mt-2 text-surface-700 dark:text-dark-secondary">{userData.bio}</p>
                    )}
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        {filters.showLocation && userData.location && (
                          <div className="flex items-center text-surface-600 dark:text-dark-secondary">
                            <MapPin size={16} className="mr-2 shrink-0" />
                            <span>{userData.location}</span>
                          </div>
                        )}
                        
                        {filters.showCompany && userData.company && (
                          <div className="flex items-center text-surface-600 dark:text-dark-secondary">
                            <Building2 size={16} className="mr-2 shrink-0" />
                            <span>{userData.company}</span>
                          </div>
                        )}
                        
                        {filters.showJoinedYear && (
                          <div className="flex items-center text-surface-600 dark:text-dark-secondary">
                            <Calendar size={16} className="mr-2 shrink-0" />
                            <span>Joined {new Date(userData.created_at).getFullYear()}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        {userData.social?.email && (
                          <div className="flex items-center text-surface-600 dark:text-dark-secondary">
                            <Mail size={16} className="mr-2 shrink-0" />
                            <a 
                              href={`mailto:${userData.social.email}`} 
                              className="hover:text-primary-600 dark:hover:text-primary-500 truncate"
                            >
                              {userData.social.email}
                            </a>
                          </div>
                        )}
                        
                        {userData.social?.blog && (
                          <div className="flex items-center text-surface-600 dark:text-dark-secondary">
                            <LinkIcon size={16} className="mr-2 shrink-0" />
                            <a 
                              href={userData.social.blog.startsWith('http') ? userData.social.blog : `https://${userData.social.blog}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary-600 dark:hover:text-primary-500 truncate"
                            >
                              {userData.social.blog}
                            </a>
                          </div>
                        )}
                        
                        {userData.social?.twitter_username && (
                          <div className="flex items-center text-surface-600 dark:text-dark-secondary">
                            <Twitter size={16} className="mr-2 shrink-0" />
                            <a 
                              href={userData.social.twitter_username}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary-600 dark:hover:text-primary-500 truncate"
                            >
                              {userData.social.twitter_username.split('/').pop()}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats & Repos */}
                <div className="space-y-8">
                  {filters.statsView.showPinned && (
                    <div className="page-break-inside-avoid">
                      <UserStats data={userData} />
                    </div>
                  )}
                  <div className="page-break-inside-avoid">
                    <TopRepositories data={userData} />
                  </div>
                  <div className="page-break-inside-avoid">
                    <Contributions data={userData} />
                  </div>
                </div>

                {/* Teknoloji Insights Bölümü */}
                <div className="mt-8 mb-8">
                  <TechnologyInsights repositories={userData.repositories} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customize butonu - mobil/tablet için */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className={cn(
            "fixed bottom-4 right-4 z-30 lg:hidden",
            "inline-flex items-center space-x-2",
            "px-6 py-2.5 text-base font-medium rounded-xl transition-all duration-300",
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
          <span>Customize</span>
        </button>

        {/* Mobil/tablet için drawer */}
        <CustomizeDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)}
        >
          <CustomizePanel />
        </CustomizeDrawer>
      </div>
    </div>
  );
} 