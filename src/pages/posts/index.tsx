import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AppDispatch, RootState } from '../../store';
import { fetchPosts } from '../../store/slices/posts-slice';
import { PostCard } from './components/post-card';
import { Button } from '../../components/ui/button';
import { TagFilter } from '../../components/posts/tag-filter';
import { Pagination } from '../../components/ui/pagination';
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { TagsService } from '../../services/tags-service';
import { Tag } from '../../types/tag';

export default function PostsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, currentPage, totalPages, loading } = useSelector((state: RootState) => state.posts);
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<number[]>([]);

  useEffect(() => {
    loadData();
  }, [dispatch, currentPage]);

  const loadData = async () => {
    try {
      const [tagsData] = await Promise.all([
        TagsService.getTags(),
        dispatch(fetchPosts(currentPage)).unwrap()
      ]);
      setTags(tagsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchPosts(page));
  };

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

  if (loading && posts.length === 0) {
    return <LoadingSpinner />;
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}