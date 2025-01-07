import React, { useState, useEffect } from 'react';
import { User } from '../../../types/auth';
import { UserProfile } from '../../../types/profile';
import { AdminHeader } from '../components/admin-header';
import { AdminTable } from '../components/admin-table';
import { ActionButtons } from '../../../components/admin/components/action-buttons';
import { ConfirmDialog } from '../../../components/admin/components/confirm-dialog';
import { UserDialog } from './components/user-dialog';
import { ProfileDialog } from './components/profile-dialog';
import { formatDate } from '../../../lib/utils';
import { AdminService } from '../../../services/admin-service';
import { UserCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { cn } from '../../../lib/utils';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
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
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      header: 'User',
      accessor: (user: User) => (
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">@{user.username}</div>
          </div>
        </div>
      )
    },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Role & Status',
      accessor: (user: User) => (
        <div className="space-y-1">
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            user.role === 'admin' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}>
            {user.role}
          </span>
          <div className="text-sm text-muted-foreground">
            {user.status}
          </div>
        </div>
      )
    },
    { 
      header: 'Joined',
      accessor: (user: User) => (
        <div className="text-sm text-muted-foreground">
          {formatDate(user.created_at)}
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: (user: User) => (
        <div className="flex items-center justify-end gap-2">
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

  const handleProfileClick = async (user: User) => {
    try {
      const profile = await AdminService.getUserProfile(user.id);
      setSelectedUser(user);
      setSelectedProfile(profile);
      setIsProfileDialogOpen(true);
    } catch (error) {
      toast.error('Failed to load user profile');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <AdminHeader 
        title="User Management" 
        onAdd={() => {
          setSelectedUser(null);
          setIsUserDialogOpen(true);
        }}
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
        onSubmit={async (data) => {
          setIsSubmitting(true);
          try {
            if (selectedUser) {
              const updatedUser = await AdminService.updateUser(selectedUser.id, data);
              setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
              toast.success('User updated successfully');
            } else {
              const newUser = await AdminService.createUser(data);
              setUsers([newUser, ...users]);
              toast.success('User created successfully');
            }
            setIsUserDialogOpen(false);
          } catch (error) {
            toast.error(selectedUser ? 'Failed to update user' : 'Failed to create user');
          } finally {
            setIsSubmitting(false);
          }
        }}
        isSubmitting={isSubmitting}
      />

      {selectedUser && (
        <ProfileDialog
          isOpen={isProfileDialogOpen}
          user={selectedUser}
          profile={selectedProfile || undefined}
          onClose={() => {
            setIsProfileDialogOpen(false);
            setSelectedUser(null);
            setSelectedProfile(null);
          }}
          onSubmit={async (data) => {
            setIsSubmitting(true);
            try {
              const updatedProfile = await AdminService.updateUserProfile(selectedUser.id, data);
              setSelectedProfile(updatedProfile);
              toast.success('Profile updated successfully');
              setIsProfileDialogOpen(false);
            } catch (error) {
              toast.error('Failed to update profile');
            } finally {
              setIsSubmitting(false);
            }
          }}
          isSubmitting={isSubmitting}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteUserId}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={async () => {
          if (!deleteUserId) return;
          
          setIsDeleting(true);
          try {
            await AdminService.deleteUser(deleteUserId);
            setUsers(users.filter(user => user.id !== deleteUserId));
            toast.success('User deleted successfully');
          } catch (error) {
            toast.error('Failed to delete user');
          } finally {
            setIsDeleting(false);
            setDeleteUserId(null);
          }
        }}
        onCancel={() => setDeleteUserId(null)}
      />
    </div>
  );
}