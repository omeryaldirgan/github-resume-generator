import { ChartData } from 'chart.js';
import { Technology } from '@/types/github';

// Profesyonel renk paleti
const CHART_COLORS = {
  primary: ['#3B82F6', '#6366F1', '#8B5CF6', '#D946EF', '#EC4899'],
  secondary: ['#2DD4BF', '#14B8A6', '#0EA5E9', '#6366F1', '#8B5CF6'],
  background: ['rgba(59, 130, 246, 0.1)', 'rgba(99, 102, 241, 0.1)'],
  text: '#64748B',
  grid: '#E2E8F0'
};

export function getLanguageChartData(languages: Technology[]): ChartData<'doughnut'> {
  return {
    labels: languages.map(lang => lang.name),
    datasets: [{
      data: languages.map(lang => lang.percentage),
      backgroundColor: CHART_COLORS.primary,
      borderColor: '#ffffff',
      borderWidth: 2,
      borderRadius: 4,
      spacing: 2,
      hoverOffset: 4
    }]
  };
}

export function getFrameworkChartData(frameworks: Technology[]): ChartData<'bar'> {
  return {
    labels: frameworks.map(fw => fw.name),
    datasets: [{
      label: 'Contribution Level',
      data: frameworks.map(fw => fw.commits),
      backgroundColor: CHART_COLORS.secondary,
      borderRadius: 8,
      barThickness: 24,
      maxBarThickness: 32,
      borderSkipped: false
    }]
  };
}

export const languageChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        color: CHART_COLORS.text,
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      padding: 12,
      titleFont: {
        size: 13,
        weight: 600,
        family: 'Inter, system-ui, sans-serif'
      },
      bodyFont: {
        size: 12,
        family: 'Inter, system-ui, sans-serif'
      },
      cornerRadius: 4,
      displayColors: true,
      boxPadding: 4
    }
  }
};

export const frameworkChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      padding: 12,
      titleFont: {
        size: 13,
        weight: 600,
        family: 'Inter, system-ui, sans-serif'
      },
      bodyFont: {
        size: 12,
        family: 'Inter, system-ui, sans-serif'
      },
      cornerRadius: 4
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        color: CHART_COLORS.text,
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 12
        }
      }
    },
    y: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        color: CHART_COLORS.text,
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 12
        }
      }
    }
  }
}; 