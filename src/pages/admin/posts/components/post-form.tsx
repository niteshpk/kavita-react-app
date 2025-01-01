import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Multiselect } from '../../../../components/ui/multiselect';
import { Post } from '../../../../types/post';
import { Tag } from '../../../../types/tag';

const postSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  body: z.string()
    .min(10, 'Content must be at least 10 characters'),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  status: z.enum(['draft', 'published']),
  tagIds: z.array(z.number()).min(1, 'Select at least one tag'),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  post?: Post;
  tags: Tag[];
  onSubmit: (data: PostFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function PostForm({ post, tags, onSubmit, onCancel, isSubmitting }: PostFormProps) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: post ? {
      title: post.title,
      body: post.body,
      imageUrl: post.imageUrl,
      status: post.status,
      tagIds: post.tags.map(tag => tag.id),
    } : {
      status: 'draft',
      tagIds: [],
    },
  });

  const tagOptions = tags.map(tag => ({
    value: tag.id,
    label: tag.name,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <Input
          id="title"
          {...register('title')}
          error={errors.title?.message}
          placeholder="Enter post title"
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium mb-2">
          Content
        </label>
        <textarea
          id="body"
          {...register('body')}
          className="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Write your post content here..."
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-500">{errors.body.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
          Image URL (optional)
        </label>
        <Input
          id="imageUrl"
          type="url"
          {...register('imageUrl')}
          error={errors.imageUrl?.message}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium mb-2">
          Status
        </label>
        <select
          id="status"
          {...register('status')}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <Controller
          name="tagIds"
          control={control}
          render={({ field }) => (
            <Multiselect
              options={tagOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Search and select tags..."
              error={errors.tagIds?.message}
            />
          )}
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
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
}