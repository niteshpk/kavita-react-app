import React from 'react';
import { cn } from '../../lib/utils';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      "bg-primary/10 text-primary",
      className
    )}>
      {children}
    </span>
  );
}