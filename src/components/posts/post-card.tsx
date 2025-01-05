import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../lib/utils';
import { Post } from '../../../types/post';
import { Tag } from '../../../components/ui/tag';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();

  return (
    <article
      className="bg-card rounded-lg overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-40 sm:h-48 object-cover"
        />
      )}
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-card-foreground line-clamp-2">
          {post.title}
        </h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map(tag => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </div>
        <p className="text-muted-foreground text-sm sm:text-base line-clamp-2 mb-4">
          {post.body}
        </p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {post.author.name}
                </span>
              </div>
            )}
            <span className="text-muted-foreground hidden sm:inline">{post.author.name}</span>
            <span className="text-muted-foreground sm:hidden">{post.author.name.split(' ')[0]}</span>
          </div>
          <time className="text-muted-foreground text-xs sm:text-sm">
            {formatDate(post.created_at)}
          </time>
        </div>
      </div>
    </article>
  );
}