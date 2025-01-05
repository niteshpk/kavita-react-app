import React, { useState, useEffect } from 'react';
import { User } from '../../../types/auth';
import { AdminHeader } from '../components/admin-header';
import { AdminTable } from '../components/admin-table';
import { ActionButtons } from '../../../components/admin/components/action-buttons';
import { ConfirmDialog } from '../../../components/admin/components/confirm-dialog';
import { UserDialog } from './components/user-dialog';
import { formatDate, cn } from '../../../lib/utils';
import { AdminService } from '../../../services/admin-service';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { UserCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await AdminService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (data: any) => {
    setIsSubmitting(true);
    try {
      const newUser = await AdminService.createUser(data);
      setUsers([newUser, ...users]);
      toast.success('User created successfully');
      setIsUserDialogOpen(false);
    } catch (error) {
      console.error('Failed to create user:', error);
      toast.error('Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (data: any) => {
    if (!selectedUser) return;

    setIsSubmitting(true);
    try {
      const updatedUser = await AdminService.updateUser(selectedUser.id, data);
      setUsers(users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      ));
      toast.success('User updated successfully');
      setIsUserDialogOpen(false);
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error('Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteUserId) return;

    setIsDeleting(true);
    try {
      await AdminService.deleteUser(deleteUserId);
      setUsers(users.filter(user => user.id !== deleteUserId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user');
    } finally {
      setIsDeleting(false);
      setDeleteUserId(null);
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsUserDialogOpen(true);
  };

  const columns = [
    {
      header: 'User Details',
      accessor: (user: User) => (
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-medium text-primary">
                {user.name[0]}
              </span>
            </div>
          )}
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">@{user.username}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Role & Date',
      accessor: (user: User) => (
        <div className="space-y-1">
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            user.role === 'admin' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}>
            {user.role}
          </span>
          <div className="text-sm text-muted-foreground">
            Joined {formatDate(user.created_at)}
          </div>
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: (user: User) => (
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleProfileClick(user);
            }}
          >
            <UserCircle className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <ActionButtons
            onEdit={() => {
              setSelectedUser(user);
              setIsUserDialogOpen(true);
            }}
            onDelete={() => setDeleteUserId(user.id)}
          />
        </div>
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
        title="User Management"
        onAdd={handleAddUser}
        addButtonText="Add User"
      />

      <AdminTable columns={columns} data={users} />

      <UserDialog
        isOpen={isUserDialogOpen}
        user={selectedUser || undefined}
        onClose={() => {
          setIsUserDialogOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deleteUserId}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteUserId(null)}
      />
    </div>
  );
}