import '@/lib/chart-config';
import { useMemo } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Code, Framer,  GitBranch, Brain, Zap, Trophy } from 'lucide-react';
import { getLanguageChartData, getFrameworkChartData, languageChartOptions, frameworkChartOptions } from '@/lib/chart-utils';
import { TechAnalysisService } from '@/lib/services/tech-analysis.service';
import type { Repository } from '@/types/github';

const techAnalysisService = new TechAnalysisService();


export default function TechnologyInsights({ repositories }: { repositories: Repository[] }) {
  const analysis = useMemo(() => {
    return techAnalysisService.analyzeRepositories(repositories);
  }, [repositories]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative z-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Technology Mastery
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Comprehensive analysis of technical expertise and growth
          </p>
        </div>
        <Trophy className="text-primary-600 dark:text-primary-500 h-6 w-6" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
        {/* Sol Kolon - Dil ve Framework Dağılımı */}
        <div className="space-y-6">
          {/* Dil Kullanım Grafiği */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 md:p-5 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h4 className="text-base font-medium mb-4 flex items-center text-gray-900 dark:text-gray-100">
              <Code className="mr-2 text-blue-500" size={20} />
              Language Distribution
            </h4>
            <div className="h-52 md:h-64">
              <Doughnut 
                data={getLanguageChartData(analysis.languageDistribution)} 
                options={languageChartOptions} 
              />
            </div>
          </div>

          {/* Framework Kullanımı */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 md:p-5 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h4 className="text-base font-medium mb-4 flex items-center text-gray-900 dark:text-gray-100">
              <Framer className="mr-2 text-purple-500" size={20} />
              Framework Expertise
            </h4>
            <div className="h-52 md:h-64">
              <Bar 
                data={getFrameworkChartData(analysis.frameworkExpertise)} 
                options={frameworkChartOptions}
              />
            </div>
          </div>
        </div>

        {/* Sağ Kolon - Uzmanlık ve Öneriler */}
        <div className="space-y-6">
          {/* Uzmanlık Seviyeleri */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 md:p-5 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <h4 className="text-base font-medium mb-6 flex items-center text-gray-900 dark:text-gray-100">
              <Brain className="mr-2 text-indigo-500" size={20} />
              Expertise Levels
            </h4>
            <div className="space-y-5">
              {analysis.primaryLanguages.map(tech => (
                <div key={tech.name} className="relative py-1">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {tech.name}
                      </span>
                      {tech.experience === 'Expert' && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Expert
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <GitBranch className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{tech.commits}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300 bg-primary-600 dark:bg-primary-500"
                      style={{ width: `${tech.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Öneriler ve Growth */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 md:p-5 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <h4 className="text-base font-medium mb-4 flex items-center text-gray-900 dark:text-gray-100">
              <Zap className="mr-2 text-yellow-500" size={20} />
              Growth Recommendations
            </h4>
            <div className="space-y-4">
              {analysis.recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-md bg-gray-50/50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true
      }
    }
  }
}; 