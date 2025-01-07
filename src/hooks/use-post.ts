import { useState, useEffect } from 'react';
import { Post } from '../types/post';
import { PostsService } from '../services/posts-service';
import { handleError } from '../lib/error-handler';

export function usePost(id: number) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostsService.getPost(id);
        if (response.success) {
          setPost(response.post);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Failed to fetch post:', handleError(err));
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, loading, error };
}