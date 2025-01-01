import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createPost } from '../../store/slices/posts-slice';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

type PostForm = z.infer<typeof postSchema>;

export default function CreatePostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostForm) => {
    try {
      await dispatch(createPost(data)).unwrap();
      navigate('/posts');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title
              </label>
              <Input
                id="title"
                {...register('title')}
                error={errors.title?.message}
              />
            </div>

            <div>
              <label htmlFor="body" className="block text-sm font-medium mb-2">
                Content
              </label>
              <textarea
                id="body"
                {...register('body')}
                className="w-full min-h-[200px] rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/posts')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
              >
                Create Post
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}