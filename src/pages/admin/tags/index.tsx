import React, { useState, useEffect } from 'react';
import { Tag } from '../../../types/tag';
import { AdminHeader } from '../components/admin-header';
import { AdminTable } from '../components/admin-table';
import { ActionButtons } from '../../../components/admin/components/action-buttons';
import { ConfirmDialog } from '../../../components/admin/components/confirm-dialog';
import { TagDialog } from './components/tag-dialog';
import { formatDate } from '../../../lib/utils';
import { AdminService } from '../../../services/admin-service';
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
      toast.error('Failed to load tags');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: 'Tag',
      accessor: (tag: Tag) => (
        <div className="space-y-1">
          <div className="font-medium">{tag.name}</div>
        </div>
      )
    },
    {
      header: 'Created',
      accessor: (tag: Tag) => (
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">
            Created at {formatDate(tag.created_at)}
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
      className: 'text-right '
    }
  ];

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <AdminHeader
        title="Tags Management"
        onAdd={() => {
          setSelectedTag(null);
          setIsTagDialogOpen(true);
        }}
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
        onSubmit={async (data) => {
          setIsSubmitting(true);
          try {
            if (selectedTag) {
              const updatedTag = await AdminService.updateTag(selectedTag.id, data);
              setTags(tags.map(t => t.id === updatedTag.id ? updatedTag : t));
              toast.success('Tag updated successfully');
            } else {
              const newTag = await AdminService.createTag(data);
              setTags([...tags, newTag]);
              toast.success('Tag created successfully');
            }
            setIsTagDialogOpen(false);
          } catch (error) {
            toast.error(selectedTag ? 'Failed to update tag' : 'Failed to create tag');
          } finally {
            setIsSubmitting(false);
          }
        }}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deleteTagId}
        title="Delete Tag"
        message="Are you sure you want to delete this tag? This action cannot be undone and will remove the tag from all associated posts."
        isLoading={isDeleting}
        onConfirm={async () => {
          if (!deleteTagId) return;

          setIsDeleting(true);
          try {
            await AdminService.deleteTag(deleteTagId);
            setTags(tags.filter(tag => tag.id !== deleteTagId));
            toast.success('Tag deleted successfully');
          } catch (error) {
            toast.error('Failed to delete tag');
          } finally {
            setIsDeleting(false);
            setDeleteTagId(null);
          }
        }}
        onCancel={() => setDeleteTagId(null)}
      />
    </div>
  );
}