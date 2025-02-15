type Technology = {
  name: string;
  icon: string;
  category: 'language' | 'framework' | 'tool';
  experience: number; // Yıl olarak
};

export default function TechStack({ repositories }: { repositories: any[] }) {
  // Repolardaki dilleri ve teknolojileri analiz et
  const techStack = analyzeTechnologies(repositories);
  
  return (
    <div className="tech-stack-grid">
      {techStack.map(tech => (
        <TechBadge key={tech.name} technology={tech} />
      ))}
    </div>
  );
} 