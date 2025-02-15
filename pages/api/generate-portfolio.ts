async function generatePortfolio(githubData: any) {
  const portfolio = {
    projects: formatProjects(githubData.repositories),
    skills: extractSkills(githubData),
    experience: generateTimeline(githubData),
    blog: await fetchBlogPosts(githubData.login)
  };
  
  return portfolio;
} 