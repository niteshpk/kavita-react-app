import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { AppDispatch } from '../../store';
import { createTag } from '../../store/slices/tags-slice';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import toast from 'react-hot-toast';

const tagSchema = z.object({
  name: z.string()
    .min(2, 'Tag name must be at least 2 characters')
    .max(50, 'Tag name must be less than 50 characters'),
});

type TagForm = z.infer<typeof tagSchema>;

export default function CreateTagPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TagForm>({
    resolver: zodResolver(tagSchema),
  });

  const onSubmit = async (data: TagForm) => {
    try {
      await dispatch(createTag(data)).unwrap();
      toast.success('Tag created successfully');
      navigate('/tags');
    } catch (error) {
      console.error('Failed to create tag:', error);
      toast.error('Failed to create tag');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => navigate('/tags')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to tags
      </Button>

      <div className="bg-card rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Tag</h1>
        
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

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/tags')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
            >
              Create Tag
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}