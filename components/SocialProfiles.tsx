export default function SocialProfiles({ data }: { data: any }) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-card">
      <h3 className="text-xl font-semibold mb-6 text-surface-900 dark:text-dark">Social Presence</h3>
      
      <div className="grid gap-4">
        {/* Blog Yazıları */}
        {data.blog_posts?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Recent Blog Posts</h4>
            {data.blog_posts.map((post: any) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:bg-surface-50 dark:hover:bg-surface-800 p-3 rounded-lg"
              >
                <h5 className="font-medium text-primary-600 dark:text-primary-500">{post.title}</h5>
                <p className="text-sm text-surface-600 dark:text-dark-secondary mt-1">{post.excerpt}</p>
              </a>
            ))}
          </div>
        )}
        
        {/* Twitter/X Aktivitesi */}
        {/* LinkedIn Profili */}
        {/* Stack Overflow İstatistikleri */}
      </div>
    </div>
  );
} 