import React from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '../../ui/button';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ActionButtons({ onEdit, onDelete }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}