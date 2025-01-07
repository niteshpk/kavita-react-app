import React, { useState, useEffect } from 'react';
import { Post } from '../../../types/post';
import { AdminHeader } from '../components/admin-header';
import { AdminTable } from '../components/admin-table';
import { ActionButtons } from '../../../components/admin/components/action-buttons';
import { ConfirmDialog } from '../../../components/admin/components/confirm-dialog';
import { PostDialog } from './components/post-dialog';
import { formatDate } from '../../../lib/utils';
import { AdminService } from '../../../services/admin-service';
import { Tag } from '../../../types/tag';
import { TagsService } from '../../../services/tags-service';
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
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: 'Title & Preview',
      accessor: (post: Post) => (
        <div className="space-y-1">
          <div className="font-medium">{post.title}</div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.body}
          </p>
        </div>
      )
    },
    {
      header: 'Author & Date',
      accessor: (post: Post) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">
                {post.author.username[0].toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium">{post.author.username}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDate(post.created_at)}
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (post: Post) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.status === 'published'
            ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
          }`}>
          {post.status}
        </span>
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
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <AdminHeader
        title="Posts Management"
        onAdd={() => {
          setSelectedPost(null);
          setIsPostDialogOpen(true);
        }}
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
        onSubmit={async (data) => {
          setIsSubmitting(true);
          try {
            if (selectedPost) {
              const updatedPost = await AdminService.updatePost(selectedPost.id, data);
              setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
              toast.success('Post updated successfully');
            } else {
              const newPost = await AdminService.createPost(data);
              setPosts([newPost, ...posts]);
              toast.success('Post created successfully');
            }
            setIsPostDialogOpen(false);
          } catch (error) {
            toast.error(selectedPost ? 'Failed to update post' : 'Failed to create post');
          } finally {
            setIsSubmitting(false);
          }
        }}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deletePostId}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={async () => {
          if (!deletePostId) return;

          setIsDeleting(true);
          try {
            await AdminService.deletePost(deletePostId);
            setPosts(posts.filter(post => post.id !== deletePostId));
            toast.success('Post deleted successfully');
          } catch (error) {
            toast.error('Failed to delete post');
          } finally {
            setIsDeleting(false);
            setDeletePostId(null);
          }
        }}
        onCancel={() => setDeletePostId(null)}
      />
    </div>
  );
}