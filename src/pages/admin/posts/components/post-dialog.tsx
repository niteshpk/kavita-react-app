import React from 'react';
import { X } from 'lucide-react';
import { Post } from '../../../../types/post';
import { Tag } from '../../../../types/tag';
import { PostForm } from './post-form';

interface PostDialogProps {
  isOpen: boolean;
  post?: Post;
  tags: Tag[];
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

export function PostDialog({ isOpen, post, tags, onClose, onSubmit, isSubmitting }: PostDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-4xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {post ? 'Edit Post' : 'Create Post'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <PostForm
          post={post}
          tags={tags}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}