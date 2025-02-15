import { StatItem } from '@/types/github';
import { cn } from '@/lib/utils';

type StatColor = 'primary' | 'secondary' | 'success' | 'warning';

interface StatCardProps {
  stat: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: StatColor;
  };
  variant: 'default' | 'pill';
}

const colorVariants: Record<StatColor, string> = {
  primary: "text-primary-600 dark:text-primary-400",
  secondary: "text-purple-600 dark:text-purple-400",
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
};

interface StatProps {
  stat: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color?: StatColor;
  };
}

export function StatCard({ stat, variant }: StatCardProps) {
  if (variant === 'pill') {
    return (
      <div className={cn(
        "flex items-center px-4 py-2 rounded-full transition-all duration-200",
        colorVariants[stat.color || 'primary']
      )}>
        <span className="shrink-0">{stat.icon}</span>
        <div className="ml-2 flex items-baseline">
          <span className="text-lg font-semibold">
            {stat.value.toLocaleString()}
          </span>
          <span className="ml-1 text-sm opacity-90">
            {stat.label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 p-4 rounded-lg border border-surface-200 dark:border-dark hover:bg-surface-50 dark:hover:bg-dark-card/50 transition-colors duration-200">
      <span className={cn(
        "shrink-0",
        colorVariants[stat.color || 'primary']
      )}>
        {stat.icon}
      </span>
      <div>
        <div className="text-2xl font-bold text-surface-900 dark:text-dark">
          {stat.value.toLocaleString()}
        </div>
        <div className="text-surface-600 dark:text-dark-secondary text-sm">
          {stat.label}
        </div>
      </div>
    </div>
  );
} 