export default function ContributionCalendar({ data }: { data: any }) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-card">
      <h3 className="text-xl font-semibold mb-6 text-surface-900 dark:text-dark">Contribution Calendar</h3>
      
      <div className="contribution-grid">
        {/* 52 haftalık katkı ızgarası */}
        <div className="grid grid-cols-52 gap-1">
          {Array.from({ length: 52 }).map((_, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: `var(--contribution-${getContributionLevel(data, weekIndex, dayIndex)})`
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        
        {/* Renk Açıklamaları */}
        <div className="flex items-center justify-end mt-2 text-xs text-surface-600 dark:text-dark-secondary">
          <span>Less</span>
          <div className="flex gap-1 mx-2">
            {/* Renk göstergeleri */}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

function getContributionLevel(data: number[][], weekIndex: number, dayIndex: number): string {
  const count = data[weekIndex][dayIndex];
  if (count === 0) return 'none';
  if (count <= 3) return 'low';
  if (count <= 6) return 'medium';
  if (count <= 9) return 'high';
  return 'very-high';
} 