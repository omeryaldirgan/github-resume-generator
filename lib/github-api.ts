type GitHubEvent = {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: Array<{
      message: string;
      sha: string;
    }>;
    pull_request?: {
      title: string;
      html_url: string;
      merged: boolean;
    };
    issue?: {
      title: string;
      html_url: string;
    };
  };
};

export async function fetchGitHubData(username: string): Promise<any> {
  const headers = process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {};

  try {
    // Kullanıcı bilgilerini çek
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers
    });
    const userData = await userResponse.json();

    if (userResponse.status === 404) {
      throw new Error('User not found');
    }

    // Sosyal medya bilgilerini ekle
    const socialData = {
      email: userData.email,
      twitter_username: userData.twitter_username ? `https://twitter.com/${userData.twitter_username}` : null,
      blog: userData.blog,
      company: userData.company,
      location: userData.location,
      hireable: userData.hireable,
    };

    // Kullanıcının repolarını çek
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=6`,
      { headers }
    );
    const reposData = await reposResponse.json();

    // Katkıları çek (son 100 event)
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      { headers }
    );
    
    // API yanıtını kontrol et
    if (!eventsResponse.ok) {
      console.error('Events API error:', await eventsResponse.text());
      return {
        ...userData,
        social: socialData,
        repositories: reposData,
        contributions: [],
        stats: { commits: 0, pullRequests: 0, issues: 0 }
      };
    }

    const eventsData = await eventsResponse.json();

    // Veri yapısını kontrol et
    if (!Array.isArray(eventsData)) {
      console.error('Events data is not an array:', eventsData);
      return {
        ...userData,
        social: socialData,
        repositories: reposData,
        contributions: [],
        stats: { commits: 0, pullRequests: 0, issues: 0 }
      };
    }

    // Commit sayısını hesapla
    const commitCount = eventsData.filter(
      (event: any) => event.type === 'PushEvent'
    ).reduce((acc: number, event: any) => acc + event.payload.commits?.length || 0, 0);

    // PR sayısını hesapla
    const prCount = eventsData.filter(
      (event: any) => event.type === 'PullRequestEvent'
    ).length;

    // Issue sayısını hesapla
    const issueCount = eventsData.filter(
      (event: any) => event.type === 'IssuesEvent'
    ).length;

    // Katkıları formatla
    const contributions = eventsData.map((event: any) => {
      switch (event.type) {
        case 'PushEvent':
          return event.payload.commits?.map((commit: any) => ({
            type: 'commit',
            title: commit.message,
            date: event.created_at,
            repo: event.repo.name,
            url: `https://github.com/${event.repo.name}/commit/${commit.sha}`
          }));
        case 'PullRequestEvent':
          return {
            type: 'pr',
            title: event.payload.pull_request.title,
            date: event.created_at,
            repo: event.repo.name,
            url: event.payload.pull_request.html_url,
            merged: event.payload.pull_request.merged
          };
        case 'IssuesEvent':
          return {
            type: 'issue',
            title: event.payload.issue.title,
            date: event.created_at,
            repo: event.repo.name,
            url: event.payload.issue.html_url
          };
        default:
          return null;
      }
    }).flat().filter(Boolean);

    // GitHub Achievements'ları çek
    const achievementsResponse = await fetch(
      `https://api.github.com/users/${username}/achievements`,
      { headers }
    );

    // Başarıları formatla
    const achievements = {
      topContributor: true,
      quickDrawAchievement: true,
      pairExtraordinaire: true,
      // ...diğer başarılar
    };

    // Repoların detaylı bilgilerini çek
    const detailedRepos = await Promise.all(
      reposData.map(async (repo: any) => {
        // Dil istatistiklerini çek
        const languagesResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/languages`,
          { headers }
        );
        const languages = await languagesResponse.json();

        // Commit sayısını çek
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`,
          { headers }
        );
        const commits = parseInt(commitsResponse.headers.get('x-total-count') || '0');

        // package.json analizi
        let dependencies = {};
        try {
          const packageResponse = await fetch(
            `https://raw.githubusercontent.com/${username}/${repo.name}/main/package.json`
          );
          if (packageResponse.ok) {
            const packageJson = await packageResponse.json();
            dependencies = {
              ...packageJson.dependencies,
              ...packageJson.devDependencies
            };
          }
        } catch (error) {
          // package.json bulunamadı
        }

        return {
          ...repo,
          languages,
          commits,
          dependencies
        };
      })
    );

    return {
      ...userData,
      social: socialData,
      repositories: detailedRepos,
      contributions,
      achievements,
      stats: {
        commits: commitCount,
        pullRequests: prCount,
        issues: issueCount
      }
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    // Hata durumunda boş veri döndür
    return {
      name: username,
      login: username,
      avatar_url: '',
      social: {},
      repositories: [],
      contributions: [],
      stats: { commits: 0, pullRequests: 0, issues: 0 }
    };
  }
} 