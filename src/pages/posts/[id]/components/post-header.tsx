import React from 'react';
import { Post } from '../../../../types/post';
import { Tag } from '../../../../components/ui/tag';
import { formatDate } from '../../../../lib/utils';

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="mb-8">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-[300px] lg:h-[400px] object-cover rounded-lg mb-8"
        />
      )}

      <h1 className="text-3xl lg:text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags?.map(tag => (
          <Tag key={tag.id}>{tag.name}</Tag>
        ))}
      </div>

      <div className="flex items-center text-sm text-muted-foreground">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <span className="text-xs font-medium text-primary">
              {post.author.username[0].toUpperCase()}
            </span>
          </div>
          <span className="font-medium text-foreground">{post.author.username}</span>
        </div>
        <span className="mx-2">•</span>
        <time>{formatDate(post.created_at)}</time>
      </div>
    </div>
  );
}