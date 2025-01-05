import React from 'react';
import { Post } from '../../../../types/post';

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <p className="text-lg leading-relaxed whitespace-pre-wrap">
        {post.body}
      </p>
    </div>
  );
}