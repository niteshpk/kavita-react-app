import React from 'react';
import { Tag as TagType } from '../../types/tag';
import { Tag } from '../ui/tag';
import { cn } from '../../lib/utils';

interface TagFilterProps {
  tags: TagType[];
  selectedTags: number[];
  onTagSelect: (tagId: number) => void;
}

export function TagFilter({ tags, selectedTags, onTagSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map(tag => (
        <button
          key={tag.id}
          onClick={() => onTagSelect(tag.id)}
          className="focus:outline-none"
        >
          <Tag
            className={cn(
              'cursor-pointer transition-colors',
              selectedTags.includes(tag.id)
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-primary/20'
            )}
          >
            {tag.name}
          </Tag>
        </button>
      ))}
    </div>
  );
}