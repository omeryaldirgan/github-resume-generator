import { Repository, Technology, TechAnalysis, TechCategory } from '@/types/github';

export class TechAnalysisService {
  private readonly TECH_CATEGORIES = {
    LANGUAGES: {
      items: ['javascript', 'typescript', 'python', 'java', 'go', 'rust'],
      category: 'language' as TechCategory
    },
    FRONTEND: {
      items: ['react', 'vue', 'angular', 'next.js', 'nuxt', 'svelte', 'tailwindcss', 'material-ui'],
      category: 'frontend' as TechCategory
    },
    BACKEND: {
      items: ['node.js', 'express', 'nestjs', 'django', 'spring', 'fastapi', 'graphql'],
      category: 'backend' as TechCategory
    },
    DATABASE: {
      items: ['mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch', 'prisma', 'typeorm'],
      category: 'database' as TechCategory
    },
    TESTING: {
      items: ['jest', 'cypress', 'playwright', 'vitest', 'testing-library', 'mocha'],
      category: 'testing' as TechCategory
    },
    DEVOPS: {
      items: ['docker', 'kubernetes', 'aws', 'azure', 'github-actions', 'terraform', 'nginx'],
      category: 'devops' as TechCategory
    }
  };

  private readonly EXPERIENCE_THRESHOLDS = {
    EXPERT: {
      commits: 1000,
      years: 2,
      repos: 5,
      percentage: 85
    },
    ADVANCED: {
      commits: 500,
      years: 1,
      repos: 3,
      percentage: 65
    },
    INTERMEDIATE: {
      commits: 100,
      years: 0.5,
      repos: 2,
      percentage: 35
    }
  };

  public analyzeRepositories(repositories: Repository[]): TechAnalysis {
    const techMap = this.buildTechnologyMap(repositories);
    const analysis = this.calculateMetrics(techMap);
    
    return {
      ...analysis,
      learningTrends: this.analyzeLearningTrends(repositories),
      recommendations: this.generateRecommendations(analysis)
    };
  }

  private buildTechnologyMap(repositories: Repository[]): Map<string, Technology> {
    const techMap = new Map<string, Technology>();

    repositories.forEach(repo => {
      this.processRepository(repo, techMap);
    });

    return techMap;
  }

  private processRepository(repo: Repository, techMap: Map<string, Technology>) {
    // Dil analizi
    if (repo.languages) {
      // GitHub API'den gelen dil istatistiklerini işle
      Object.entries(repo.languages).forEach(([language, bytes]) => {
        this.updateTechStats(techMap, language, {
          category: this.categorizeTechnology(language),
          lastUsed: new Date(repo.pushed_at),
          firstUsed: new Date(repo.created_at),
          commits: this.getCommitCount(repo),
          repoCount: 1,
          percentage: 0, // Sonra hesaplanacak
        });
      });
    }

    // Package.json dependencies analizi
    if (repo.dependencies) {
      Object.keys(repo.dependencies).forEach(dep => {
        // Dependency ismini normalize et
        const normalizedName = this.normalizeDependencyName(dep);
        
        this.updateTechStats(techMap, normalizedName, {
          category: this.categorizeTechnology(normalizedName),
          lastUsed: new Date(repo.pushed_at),
          firstUsed: new Date(repo.created_at),
          commits: this.getCommitCount(repo),
          repoCount: 1,
          importCount: 1
        });
      });
    }
  }

  private updateTechStats(techMap: Map<string, Technology>, name: string, stats: Partial<Technology>) {
    const existing = techMap.get(name);
    
    if (!existing) {
      techMap.set(name, {
        name,
        category: stats.category || 'unknown',
        commits: stats.commits || 0,
        repoCount: stats.repoCount || 0,
        lastUsed: stats.lastUsed || new Date(),
        firstUsed: stats.firstUsed || new Date(),
        importCount: stats.importCount || 0,
        percentage: 0,
        experience: 'Beginner'
      });
    } else {
      techMap.set(name, {
        ...existing,
        commits: (existing.commits || 0) + (stats.commits || 0),
        repoCount: (existing.repoCount || 0) + (stats.repoCount || 0),
        importCount: (existing.importCount || 0) + (stats.importCount || 0),
        lastUsed: stats.lastUsed || existing.lastUsed,
        firstUsed: stats.firstUsed && existing.firstUsed 
          ? new Date(Math.min(stats.firstUsed.getTime(), existing.firstUsed.getTime()))
          : existing.firstUsed || stats.firstUsed
      });
    }
  }

  private calculateExperience(tech: Technology): string {
    const yearsOfExperience = (new Date().getTime() - new Date(tech.firstUsed).getTime()) / (1000 * 60 * 60 * 24 * 365);
    
    if (tech.commits >= this.EXPERIENCE_THRESHOLDS.EXPERT.commits &&
        yearsOfExperience >= this.EXPERIENCE_THRESHOLDS.EXPERT.years &&
        tech.repoCount >= this.EXPERIENCE_THRESHOLDS.EXPERT.repos) {
      return 'Expert';
    }
    
    if (tech.commits >= this.EXPERIENCE_THRESHOLDS.ADVANCED.commits &&
        yearsOfExperience >= this.EXPERIENCE_THRESHOLDS.ADVANCED.years &&
        tech.repoCount >= this.EXPERIENCE_THRESHOLDS.ADVANCED.repos) {
      return 'Advanced';
    }
    
    if (tech.commits >= this.EXPERIENCE_THRESHOLDS.INTERMEDIATE.commits &&
        yearsOfExperience >= this.EXPERIENCE_THRESHOLDS.INTERMEDIATE.years &&
        tech.repoCount >= this.EXPERIENCE_THRESHOLDS.INTERMEDIATE.repos) {
      return 'Intermediate';
    }
    
    return 'Beginner';
  }

  private generateRecommendations(analysis: TechAnalysis): string[] {
    const recommendations: string[] = [];

    // Web Developer için öneriler
    if (this.isWebDeveloper(analysis.primaryLanguages)) {
      if (!this.hasTestingFramework(analysis.frameworkExpertise)) {
        recommendations.push('Consider adding testing frameworks like Jest and Cypress to improve code quality and reliability');
      }
      
      if (!this.hasStateManagement(analysis.frameworkExpertise)) {
        recommendations.push('Look into modern state management solutions like Redux Toolkit or Zustand for complex applications');
      }

      const missingModernTools = this.findMissingModernWebTools(analysis);
      if (missingModernTools.length > 0) {
        recommendations.push(`Consider exploring modern web tools: ${missingModernTools.join(', ')}`);
      }
    }

    // Backend Developer için öneriler
    if (this.isBackendDeveloper(analysis.primaryLanguages)) {
      if (!this.hasORMTool(analysis.frameworkExpertise)) {
        recommendations.push('Consider using an ORM like Prisma or TypeORM for better database management');
      }
      
      if (!this.hasAPITesting(analysis.frameworkExpertise)) {
        recommendations.push('Add API testing tools like Supertest or Postman for better API reliability');
      }
    }

    // DevOps yetenekleri için öneriler
    if (analysis.devopsCapabilities.length < 3) {
      recommendations.push('Strengthen your DevOps skills with Docker, GitHub Actions, and cloud platforms');
    }

    // Genel öneriler
    const missingCore = this.findMissingCoreTechnologies(analysis);
    if (missingCore.length > 0) {
      recommendations.push(`Consider learning these core technologies: ${missingCore.join(', ')}`);
    }

    return recommendations;
  }

  private categorizeTechnology(name: string): TechCategory {
    const lowerName = name.toLowerCase();
    
    if (this.TECH_CATEGORIES.LANGUAGES.items.includes(lowerName)) {
      return 'language';
    }
    if (this.TECH_CATEGORIES.FRONTEND.items.includes(lowerName)) {
      return 'frontend';
    }
    if (this.TECH_CATEGORIES.BACKEND.items.includes(lowerName)) {
      return 'backend';
    }
    if (this.TECH_CATEGORIES.DATABASE.items.includes(lowerName)) {
      return 'database';
    }
    if (this.TECH_CATEGORIES.TESTING.items.includes(lowerName)) {
      return 'testing';
    }
    if (this.TECH_CATEGORIES.DEVOPS.items.includes(lowerName)) {
      return 'devops';
    }
    
    return 'unknown';
  }

  private getCommitCount(repo: Repository): number {
    // GitHub API'den gelen commit sayısını veya varsayılan değeri döndür
    return repo.commits || Math.floor(Math.random() * 50) + 1; // Geçici çözüm
  }

  private normalizeDependencyName(name: string): string {
    // Yaygın paket prefix'lerini kaldır
    const prefixes = ['@types/', '@', 'eslint-plugin-', 'babel-'];
    let normalized = name;
    
    prefixes.forEach(prefix => {
      if (normalized.startsWith(prefix)) {
        normalized = normalized.slice(prefix.length);
      }
    });

    // Özel durumları düzelt
    const replacements: Record<string, string> = {
      'react-dom': 'react',
      'nextjs': 'next.js',
      'vuejs': 'vue',
      'tailwind': 'tailwindcss'
    };

    return replacements[normalized] || normalized;
  }

  private calculateMetrics(techMap: Map<string, Technology>): TechAnalysis {
    const technologies = Array.from(techMap.values());
    
    // Toplam commit sayısını hesapla
    const totalCommits = technologies.reduce((sum, tech) => sum + tech.commits, 0);
    
    // Yüzdeleri ve deneyim seviyelerini hesapla
    const analyzedTech = technologies.map(tech => ({
      ...tech,
      percentage: totalCommits > 0 ? (tech.commits / totalCommits) * 100 : 0,
      experience: this.calculateExperience(tech)
    }));

    return {
      primaryLanguages: this.getPrimaryLanguages(analyzedTech),
      frameworkExpertise: this.getFrameworkExpertise(analyzedTech),
      devopsCapabilities: this.getDevOpsCapabilities(analyzedTech),
      learningTrends: [],
      recommendations: []
    };
  }

  private getPrimaryLanguages(technologies: Technology[]) {
    return technologies
      .filter(tech => tech.category === 'language')
      .sort((a, b) => b.commits - a.commits)
      .slice(0, 5);
  }

  private getFrameworkExpertise(technologies: Technology[]) {
    return technologies
      .filter(tech => tech.category === 'frontend' || tech.category === 'backend')
      .sort((a, b) => b.commits - a.commits)
      .slice(0, 8);
  }

  private getDevOpsCapabilities(technologies: Technology[]) {
    return technologies
      .filter(tech => tech.category === 'devops')
      .sort((a, b) => b.commits - a.commits);
  }

  private analyzeLearningTrends(repositories: Repository[]) {
    // Simplified version for now
    return [];
  }

  private isWebDeveloper(languages: Technology[]): boolean {
    const webLanguages = ['javascript', 'typescript', 'html', 'css'];
    return languages?.some(lang => 
      webLanguages.includes(lang.name.toLowerCase())
    ) || false;
  }

  private hasTestingFramework(frameworks: Technology[]): boolean {
    const testFrameworks = ['jest', 'cypress', 'mocha', 'vitest'];
    return frameworks?.some(fw => 
      testFrameworks.includes(fw.name.toLowerCase())
    ) || false;
  }

  private hasStateManagement(frameworks: Technology[]): boolean {
    const stateLibs = ['redux', 'mobx', 'recoil', 'zustand'];
    return frameworks?.some(fw => 
      stateLibs.includes(fw.name.toLowerCase())
    ) || false;
  }

  private findMissingCoreTechnologies(analysis: TechAnalysis): string[] {
    const coreTech = {
      web: ['typescript', 'react', 'node'],
      testing: ['jest', 'cypress'],
      devops: ['docker', 'git']
    };

    const userTech = new Set(
      [...analysis.primaryLanguages, ...analysis.frameworkExpertise]
        .map(t => t.name.toLowerCase())
    );

    return Object.values(coreTech)
      .flat()
      .filter(tech => !userTech.has(tech.toLowerCase()));
  }

  private findMissingModernWebTools(analysis: TechAnalysis): string[] {
    const modernTools = ['typescript', 'next.js', 'tailwindcss', 'graphql'];
    const userTech = new Set(analysis.frameworkExpertise.map(t => t.name.toLowerCase()));
    return modernTools.filter(tool => !userTech.has(tool));
  }

  private hasORMTool(frameworks: Technology[]): boolean {
    const ormTools = ['prisma', 'typeorm', 'sequelize', 'mongoose'];
    return frameworks?.some(fw => ormTools.includes(fw.name.toLowerCase())) || false;
  }

  private hasAPITesting(frameworks: Technology[]): boolean {
    const testingTools = ['supertest', 'postman', 'insomnia', 'swagger'];
    return frameworks?.some(fw => testingTools.includes(fw.name.toLowerCase())) || false;
  }

  private isBackendDeveloper(languages: Technology[]): boolean {
    const backendLangs = ['python', 'java', 'go', 'rust', 'c#', 'php'];
    return languages?.some(lang => backendLangs.includes(lang.name.toLowerCase())) || false;
  }
} 