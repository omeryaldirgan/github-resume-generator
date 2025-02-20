import { useResume } from '@/context/ResumeContext';
import { cn } from '@/lib/utils';

export default function CustomizePanel() {
  const { filters, setFilters } = useResume();

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-card h-fit lg:sticky lg:top-24">
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
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.showLocation}
                onChange={(e) => setFilters({ ...filters, showLocation: e.target.checked })}
                className="w-4 h-4 rounded border-surface-300 dark:border-dark text-primary-600 focus:ring-primary-500 dark:bg-dark-card dark:checked:bg-primary-600 dark:checked:border-primary-600"
              />
              <span className="resume-text text-surface-700 dark:text-dark-secondary">Show Location</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.showCompany}
                onChange={(e) => setFilters({ ...filters, showCompany: e.target.checked })}
                className="w-4 h-4 rounded border-surface-300 dark:border-dark text-primary-600 focus:ring-primary-500 dark:bg-dark-card dark:checked:bg-primary-600 dark:checked:border-primary-600"
              />
              <span className="resume-text text-surface-700 dark:text-dark-secondary">Show Company</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.showJoinedYear}
                onChange={(e) => setFilters({ ...filters, showJoinedYear: e.target.checked })}
                className="w-4 h-4 rounded border-surface-300 dark:border-dark text-primary-600 focus:ring-primary-500 dark:bg-dark-card dark:checked:bg-primary-600 dark:checked:border-primary-600"
              />
              <span className="resume-text text-surface-700 dark:text-dark-secondary">Show Joined Year</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.showAvatar}
                onChange={(e) => setFilters({ ...filters, showAvatar: e.target.checked })}
                className="w-4 h-4 rounded border-surface-300 dark:border-dark text-primary-600 focus:ring-primary-500 dark:bg-dark-card dark:checked:bg-primary-600 dark:checked:border-primary-600"
              />
              <span className="resume-text text-surface-700 dark:text-dark-secondary">Show Avatar</span>
            </label>
          </div>
        </div>

        {/* Stats View Settings */}
        <div>
          <h3 className="resume-subsection-title text-surface-800 dark:text-dark mb-4">Change Stats View</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-surface-700 dark:text-dark-secondary">
                View Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFilters({
                    ...filters,
                    statsView: { ...filters.statsView, viewType: 'default' }
                  })}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    filters.statsView.viewType === 'default'
                      ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-2 border-primary-500"
                      : "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-dark-secondary border-2 border-transparent hover:border-surface-300 dark:hover:border-surface-600"
                  )}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="8" height="8" rx="1" />
                      <rect x="13" y="3" width="8" height="8" rx="1" />
                      <rect x="3" y="13" width="8" height="8" rx="1" />
                      <rect x="13" y="13" width="8" height="8" rx="1" />
                    </svg>
                    <span>Grid</span>
                  </div>
                </button>
                <button
                  onClick={() => setFilters({
                    ...filters,
                    statsView: { ...filters.statsView, viewType: 'pills' }
                  })}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    filters.statsView.viewType === 'pills'
                      ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-2 border-primary-500"
                      : "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-dark-secondary border-2 border-transparent hover:border-surface-300 dark:hover:border-surface-600"
                  )}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                    <span>Pills</span>
                  </div>
                </button>
              </div>
            </div>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.statsView.showPinned}
                onChange={(e) => setFilters({
                  ...filters,
                  statsView: {
                    ...filters.statsView,
                    showPinned: e.target.checked
                  }
                })}
                className="w-4 h-4 rounded border-surface-300 dark:border-dark text-primary-600 focus:ring-primary-500 dark:bg-dark-card dark:checked:bg-primary-600 dark:checked:border-primary-600"
              />
              <span className="resume-text text-surface-700 dark:text-dark-secondary">Show GitHub Stats</span>
            </label>
          </div>
        </div>

        {/* Repository Settings */}
        <div>
          <h3 className="resume-subsection-title text-surface-800 dark:text-dark mb-4">Customize Repositories</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-surface-700 dark:text-dark-secondary mb-2">Count:</label>
              <input
                type="number"
                value={filters.reposView.count}
                onChange={(e) => setFilters({
                  ...filters,
                  reposView: {
                    ...filters.reposView,
                    count: parseInt(e.target.value)
                  }
                })}
                min="1"
                max="10"
                className="w-20 px-3 py-2 border border-surface-300 dark:border-dark rounded-lg 
                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                         dark:bg-dark-card dark:text-dark bg-white dark:bg-dark-card"
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.reposView.showPinned}
                  onChange={(e) => setFilters({
                    ...filters,
                    reposView: {
                      ...filters.reposView,
                      showPinned: e.target.checked
                    }
                  })}
                  className="w-4 h-4 border-surface-300 dark:border-dark text-primary-600 focus:ring-primary-500 dark:bg-dark-card dark:checked:bg-primary-600 dark:checked:border-primary-600"
                />
                <span className="resume-text text-surface-700 dark:text-dark-secondary">Show pinned items</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.reposView.showStarred}
                  onChange={(e) => setFilters({
                    ...filters,
                    reposView: {
                      ...filters.reposView,
                      showStarred: e.target.checked
                    }
                  })}
                  className="w-4 h-4 border-surface-300 dark:border-dark text-primary-600 focus:ring-primary-500 dark:bg-dark-card dark:checked:bg-primary-600 dark:checked:border-primary-600"
                />
                <span className="resume-text text-surface-700 dark:text-dark-secondary">Show most starred items</span>
              </label>
            </div>
          </div>
        </div>

        {/* Contributions Settings */}
        <div>
          <h3 className="resume-subsection-title text-surface-800 dark:text-dark mb-4">Customize Contributions</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-surface-700 dark:text-dark-secondary mb-2">Count:</label>
              <input
                type="number"
                value={filters.contributionCount}
                onChange={(e) => setFilters({ ...filters, contributionCount: parseInt(e.target.value) })}
                min="1"
                max="10"
                className="w-20 px-3 py-2 border border-surface-300 dark:border-dark rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-card dark:text-dark bg-white dark:bg-dark-card"
              />
            </div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.showAndMore}
                onChange={(e) => setFilters({ ...filters, showAndMore: e.target.checked })}
                className="w-4 h-4 rounded border-surface-300 dark:border-dark text-primary-600 focus:ring-primary-500 dark:bg-dark-card dark:checked:bg-primary-600 dark:checked:border-primary-600"
              />
              <span className="resume-text text-surface-700 dark:text-dark-secondary">Show "and n more"</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.showOnlyMergedPRs}
                onChange={(e) => setFilters({ ...filters, showOnlyMergedPRs: e.target.checked })}
                className="w-4 h-4 rounded border-surface-300 dark:border-dark text-primary-600 focus:ring-primary-500 dark:bg-dark-card dark:checked:bg-primary-600 dark:checked:border-primary-600"
              />
              <span className="resume-text text-surface-700 dark:text-dark-secondary">Show only merged PRs</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
} 