import React, { useState, useEffect } from 'react';
import { Post } from '../../../types/post';
import { Tag } from '../../../types/tag';
import { AdminHeader } from '../components/admin-header';
import { AdminTable } from '../components/admin-table';
import { ActionButtons } from '../../../components/admin/components/action-buttons';
import { ConfirmDialog } from '../../../components/admin/components/confirm-dialog';
import { PostDialog } from './components/post-dialog';
import { formatDate, cn } from '../../../lib/utils';
import { AdminService } from '../../../services/admin-service';
import { TagsService } from '../../../services/tags-service';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import toast from 'react-hot-toast';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [postsData, tagsData] = await Promise.all([
        AdminService.getPosts(),
        TagsService.getTags()
      ]);
      setPosts(postsData);
      setTags(tagsData);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (data: any) => {
    setIsSubmitting(true);
    try {
      const newPost = await AdminService.createPost(data);
      setPosts([newPost, ...posts]);
      toast.success('Post created successfully');
      setIsPostDialogOpen(false);
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePost = async (data: any) => {
    if (!selectedPost) return;
    
    setIsSubmitting(true);
    try {
      const updatedPost = await AdminService.updatePost(selectedPost.id, data);
      setPosts(posts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      ));
      toast.success('Post updated successfully');
      setIsPostDialogOpen(false);
    } catch (error) {
      console.error('Failed to update post:', error);
      toast.error('Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletePostId) return;
    
    setIsDeleting(true);
    try {
      await AdminService.deletePost(deletePostId);
      setPosts(posts.filter(post => post.id !== deletePostId));
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast.error('Failed to delete post');
    } finally {
      setIsDeleting(false);
      setDeletePostId(null);
    }
  };

  const handleAddPost = () => {
    setSelectedPost(null);
    setIsPostDialogOpen(true);
  };

  const columns = [
    { 
      header: 'Post Details',
      accessor: (post: Post) => (
        <div className="space-y-2">
          <div className="font-medium">{post.title}</div>
          <div className="flex flex-wrap gap-1">
            {post.tags.map(tag => (
              <span key={tag.id} className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs",
                "bg-primary/10 text-primary"
              )}>
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )
    },
    { 
      header: 'Author & Date',
      accessor: (post: Post) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {post.author.name[0]}
                </span>
              </div>
            )}
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDate(post.createdAt)}
          </div>
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: (post: Post) => (
        <ActionButtons
          onEdit={() => {
            setSelectedPost(post);
            setIsPostDialogOpen(true);
          }}
          onDelete={() => setDeletePostId(post.id)}
        />
      ),
      className: 'text-right'
    }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <AdminHeader 
        title="Post Management" 
        onAdd={handleAddPost}
        addButtonText="Add Post"
      />
      
      <AdminTable columns={columns} data={posts} />
      
      <PostDialog
        isOpen={isPostDialogOpen}
        post={selectedPost || undefined}
        tags={tags}
        onClose={() => {
          setIsPostDialogOpen(false);
          setSelectedPost(null);
        }}
        onSubmit={selectedPost ? handleUpdatePost : handleCreatePost}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deletePostId}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeletePostId(null)}
      />
    </div>
  );
}