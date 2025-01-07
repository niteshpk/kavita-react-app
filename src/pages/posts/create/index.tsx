import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { PostForm, type PostFormData } from './components/post-form';
import { createPost } from '../../../store/slices/posts-slice';
import { TagsService } from '../../../services/tags-service';
import { Tag } from '../../../types/tag';
import { AppDispatch } from '../../../store';
import toast from 'react-hot-toast';

export default function CreatePostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [tags, setTags] = React.useState<Tag[]>([]);

  React.useEffect(() => {
    const loadTags = async () => {
      try {
        const tagsData = await TagsService.getTags();
        setTags(tagsData);
      } catch (error) {
        console.error('Failed to load tags:', error);
        toast.error('Failed to load tags');
      }
    };

    loadTags();
  }, []);

  const handleSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    try {
      await dispatch(createPost(data)).unwrap();
      toast.success('Post created successfully');
      navigate('/posts');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => navigate('/posts')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to posts
      </Button>

      <div className="bg-card rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
        <PostForm
          tags={tags}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}