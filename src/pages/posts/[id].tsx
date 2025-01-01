import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Post } from '../../types/post';
import { PostsService } from '../../services/posts-service';
import { Button } from '../../components/ui/button';
import { Tag } from '../../components/ui/tag';
import { formatDate } from '../../lib/utils';
import { LikeButton } from '../../components/posts/like-button';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await PostsService.getPost(Number(id));
        setPost(data || null);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLikeChange = (isLiked: boolean) => {
    if (post) {
      setPost({
        ...post,
        isLiked,
        likes: isLiked ? post.likes + 1 : post.likes - 1,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
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

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[200px] sm:h-[300px] lg:h-[400px] object-cover rounded-lg mb-8"
          />
        )}

        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="flex items-center space-x-2">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {post.author.name[0]}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
                <LikeButton
                  postId={post.id}
                  isLiked={post.isLiked}
                  likesCount={post.likes}
                  onLikeChange={handleLikeChange}
                />
              </div>
            </div>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
              {post.body}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}