import { useTheme } from '@/context/ThemeContext';

interface ProductHuntBadgeProps {
  size?: 'small' | 'large';
  className?: string;
}

export default function ProductHuntBadge({ size = 'large', className = '' }: ProductHuntBadgeProps) {
  const { theme } = useTheme();

  const dimensions = {
    small: { width: 140, height: 44 },
    large: { width: 250, height: 54 }
  };

  return (
    <a 
      href="https://www.producthunt.com/posts/github-resume-generator-2"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block hover:opacity-90 transition-opacity ${className}`}
    >
      <img 
        src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=882418&theme=${theme === 'dark' ? 'dark' : 'light'}&t=${Date.now()}`}
        alt="GitHub Resume Generator - Product Hunt"
        width={dimensions[size].width}
        height={dimensions[size].height}
        style={{ border: 'none' }}
      />
    </a>
  );
} 