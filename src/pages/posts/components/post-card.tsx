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
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-card-foreground">
          {post.title}
        </h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map(tag => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </div>
        <p className="text-muted-foreground line-clamp-2 mb-4">
          {post.body}
        </p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.username}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {post.author.username[0].toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-muted-foreground">{post.author.username}</span>
          </div>
          <time className="text-muted-foreground">
            {formatDate(post.created_at)}
          </time>
        </div>
      </div>
    </article>
  );
}