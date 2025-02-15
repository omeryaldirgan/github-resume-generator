'use client';

import MainContent from '@/components/MainContent';
import Footer from '@/components/Footer';

export default function GitHubResumePage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}
