import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Tag } from '../../../../types/tag';

const tagSchema = z.object({
  name: z.string()
    .min(2, 'Tag name must be at least 2 characters')
    .max(50, 'Tag name must be less than 50 characters'),
});

type TagFormData = z.infer<typeof tagSchema>;

interface TagFormProps {
  tag?: Tag;
  onSubmit: (data: TagFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function TagForm({ tag, onSubmit, onCancel, isSubmitting }: TagFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
    defaultValues: tag ? { name: tag.name } : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Tag Name
        </label>
        <Input
          id="name"
          {...register('name')}
          error={errors.name?.message}
          placeholder="Enter tag name"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          {tag ? 'Update Tag' : 'Create Tag'}
        </Button>
      </div>
    </form>
  );
}