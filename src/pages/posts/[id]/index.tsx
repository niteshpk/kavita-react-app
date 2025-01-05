import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostsService } from '../../../services/posts-service';
import { Post } from '../../../types/post';
import { PostHeader } from './components/post-header';
import { PostContent } from './components/post-content';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { Button } from '../../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<Post | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const data = await PostsService.getPost(Number(id));
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">
          {error || 'Post not found'}
        </h1>
        <Button onClick={() => navigate('/posts')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to posts
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate('/posts')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to posts
        </Button>

        <article className="max-w-4xl mx-auto">
          <PostHeader post={post} />
          <PostContent post={post} />
        </article>
      </main>
    </div>
  );
}