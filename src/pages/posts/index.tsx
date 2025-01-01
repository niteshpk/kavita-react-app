import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AppDispatch, RootState } from '../../store';
import { fetchPosts } from '../../store/slices/posts-slice';
import { PostCard } from './components/post-card';
import { Button } from '../../components/ui/button';
import { TagFilter } from '../../components/posts/tag-filter';
import { TagsService } from '../../services/tags-service';
import { Tag } from '../../types/tag';

export default function PostsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector((state: RootState) => state.posts);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsData = await TagsService.getTags();
        setTags(tagsData);
        dispatch(fetchPosts());
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleTagSelect = (tagId: number) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const filteredPosts = selectedTags.length > 0
    ? posts.filter(post =>
        post.tags.some(tag => selectedTags.includes(tag.id))
      )
    : posts;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Latest Posts</h1>
        <Link to="/posts/create">
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      <TagFilter
        tags={tags}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
      />
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No posts found for the selected tags
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}