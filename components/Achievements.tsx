export default function Achievements({ data }: { data: any }) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-card">
      <h3 className="text-xl font-semibold mb-6 text-surface-900 dark:text-dark">GitHub Achievements</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Arctic Code Vault */}
        {data.achievements?.arcticCodeVault && (
          <div className="achievement-card">
            <img src="/badges/arctic-code.svg" alt="Arctic Code Vault" className="w-16 h-16 mx-auto" />
            <p className="text-sm font-medium mt-2 text-center">Arctic Code Vault</p>
          </div>
        )}
        
        {/* Pull Shark */}
        {data.achievements?.pullShark && (
          <div className="achievement-card">
            <img src="/badges/pull-shark.svg" alt="Pull Shark" className="w-16 h-16 mx-auto" />
            <p className="text-sm font-medium mt-2 text-center">Pull Shark</p>
          </div>
        )}
        
        {/* Diğer başarılar... */}
      </div>
    </div>
  );
} 