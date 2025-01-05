import React, { useState, useEffect } from 'react';
import { Tag } from '../../../types/tag';
import { AdminHeader } from '../components/admin-header';
import { AdminTable } from '../components/admin-table';
import { ActionButtons } from '../../../components/admin/components/action-buttons';
import { ConfirmDialog } from '../../../components/admin/components/confirm-dialog';
import { TagDialog } from './components/tag-dialog';
import { formatDate, cn } from '../../../lib/utils';
import { AdminService } from '../../../services/admin-service';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import toast from 'react-hot-toast';

export default function AdminTagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [deleteTagId, setDeleteTagId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      const data = await AdminService.getTags();
      setTags(data);
    } catch (error) {
      console.error('Failed to load tags:', error);
      toast.error('Failed to load tags');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTag = async (data: any) => {
    setIsSubmitting(true);
    try {
      const newTag = await AdminService.createTag(data);
      setTags([...tags, newTag]);
      toast.success('Tag created successfully');
      setIsTagDialogOpen(false);
    } catch (error) {
      console.error('Failed to create tag:', error);
      toast.error('Failed to create tag');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTag = async (data: any) => {
    if (!selectedTag) return;

    setIsSubmitting(true);
    try {
      const updatedTag = await AdminService.updateTag(selectedTag.id, data);
      setTags(tags.map(tag =>
        tag.id === updatedTag.id ? updatedTag : tag
      ));
      toast.success('Tag updated successfully');
      setIsTagDialogOpen(false);
    } catch (error) {
      console.error('Failed to update tag:', error);
      toast.error('Failed to update tag');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTagId) return;

    setIsDeleting(true);
    try {
      await AdminService.deleteTag(deleteTagId);
      setTags(tags.filter(tag => tag.id !== deleteTagId));
      toast.success('Tag deleted successfully');
    } catch (error) {
      console.error('Failed to delete tag:', error);
      toast.error('Failed to delete tag');
    } finally {
      setIsDeleting(false);
      setDeleteTagId(null);
    }
  };

  const handleAddTag = () => {
    setSelectedTag(null);
    setIsTagDialogOpen(true);
  };

  const columns = [
    {
      header: 'Tag Details',
      accessor: (tag: Tag) => (
        <div className="space-y-1">
          <div className="font-medium">{tag.name}</div>
          <div className="text-sm text-muted-foreground">
            Created {formatDate(tag.created_at)}
          </div>
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: (tag: Tag) => (
        <ActionButtons
          onEdit={() => {
            setSelectedTag(tag);
            setIsTagDialogOpen(true);
          }}
          onDelete={() => setDeleteTagId(tag.id)}
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
        title="Tag Management"
        onAdd={handleAddTag}
        addButtonText="Add Tag"
      />

      <AdminTable columns={columns} data={tags} />

      <TagDialog
        isOpen={isTagDialogOpen}
        tag={selectedTag || undefined}
        onClose={() => {
          setIsTagDialogOpen(false);
          setSelectedTag(null);
        }}
        onSubmit={selectedTag ? handleUpdateTag : handleCreateTag}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deleteTagId}
        title="Delete Tag"
        message="Are you sure you want to delete this tag? This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTagId(null)}
      />
    </div>
  );
}