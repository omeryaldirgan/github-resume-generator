async function fetchSocialProfiles(username: string) {
  const profiles = {
    linkedin: await fetchLinkedInProfile(username),
    twitter: await fetchTwitterProfile(username),
    medium: await fetchMediumArticles(username),
    devto: await fetchDevToArticles(username)
  };
  
  return profiles;
} 