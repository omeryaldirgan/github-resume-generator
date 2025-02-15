import Image from 'next/image';
import { MapPin, Link as LinkIcon, Calendar } from 'lucide-react';

export default function UserProfile({ data }: { data: any }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-card">
      <div className="flex items-start space-x-4">
        <Image
          src={data.avatar_url}
          alt={data.name || data.login}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h3 className="text-2xl font-bold text-surface-900">{data.name || data.login}</h3>
          <p className="text-surface-600">@{data.login}</p>
          
          {data.bio && (
            <p className="mt-2 text-surface-700">{data.bio}</p>
          )}

          <div className="mt-4 space-y-2">
            {data.location && (
              <div className="flex items-center text-surface-600">
                <MapPin size={16} className="mr-2" />
                {data.location}
              </div>
            )}
            
            {data.blog && (
              <div className="flex items-center text-surface-600">
                <LinkIcon size={16} className="mr-2" />
                <a href={data.blog} target="_blank" rel="noopener noreferrer" 
                   className="text-primary-600 hover:underline">
                  {data.blog}
                </a>
              </div>
            )}

            {data.created_at && (
              <div className="flex items-center text-surface-600">
                <Calendar size={16} className="mr-2" />
                Joined {new Date(data.created_at).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 