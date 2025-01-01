import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Option {
  value: string | number;
  label: string;
}

interface MultiselectProps {
  options: Option[];
  value: Option['value'][];
  onChange: (value: Option['value'][]) => void;
  placeholder?: string;
  error?: string;
}

export function Multiselect({
  options,
  value,
  onChange,
  placeholder = 'Select options...',
  error
}: MultiselectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOptions = options.filter(option => value.includes(option.value));
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (optionValue: Option['value']) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const removeOption = (e: React.MouseEvent, optionValue: Option['value']) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        className={cn(
          'flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          'cursor-pointer',
          error && 'border-red-500',
          isOpen && 'ring-2 ring-ring ring-offset-2'
        )}
        onClick={() => setIsOpen(true)}
      >
        {selectedOptions.map(option => (
          <span
            key={option.value}
            className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-sm"
          >
            {option.label}
            <button
              type="button"
              onClick={(e) => removeOption(e, option.value)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          className={cn(
            'flex-1 bg-transparent outline-none placeholder:text-muted-foreground',
            selectedOptions.length > 0 && 'w-20'
          )}
          placeholder={selectedOptions.length === 0 ? placeholder : ''}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-card shadow-md">
          <div className="p-1">
            {filteredOptions.length === 0 ? (
              <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-muted-foreground">
                No results found
              </div>
            ) : (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none',
                    'hover:bg-accent hover:text-accent-foreground',
                    value.includes(option.value) && 'bg-primary/10'
                  )}
                  onClick={() => toggleOption(option.value)}
                >
                  {option.label}
                  {value.includes(option.value) && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}