import React from 'react';
import { X } from 'lucide-react';
import { Tag } from '../../../../types/tag';
import { TagForm } from './tag-form';

interface TagDialogProps {
  isOpen: boolean;
  tag?: Tag;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

export function TagDialog({ isOpen, tag, onClose, onSubmit, isSubmitting }: TagDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {tag ? 'Edit Tag' : 'Create Tag'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <TagForm
          tag={tag}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}