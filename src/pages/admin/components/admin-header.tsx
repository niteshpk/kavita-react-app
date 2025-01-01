import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface AdminHeaderProps {
  title: string;
  onAdd?: () => void;
  addButtonText?: string;
}

export function AdminHeader({ title, onAdd, addButtonText }: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {onAdd && (
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          {addButtonText || 'Add New'}
        </Button>
      )}
    </div>
  );
}