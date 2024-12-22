import React from 'react';
import { useUsers } from '@/query/queryHooks/useUsers';
import { UserListItem } from '@/components/user/UserListItem';
import { LoadableComponent } from '@/components/library';
import { useProfile } from '@/query/queryHooks';
import { useLocation } from 'wouter';

export const UsersManagementPage: React.FC = () => {
  const { profile } = useProfile();
  const [, setLocation] = useLocation();
  const { users, isPending, error } = useUsers();

  // Redirect if not admin
  React.useEffect(() => {
    if (profile && profile.privileges !== 'admin') {
      setLocation('/');
    }
  }, [profile, setLocation]);

  if (!profile || profile.privileges !== 'admin') {
    return null;
  }

  return (
    <div className="center">
      <div className="w-full max-w-3xl p-6">
        <h1 className="text-2xl font-bold mb-6">Users Management</h1>
        <div className="bg-white rounded-lg shadow">
          <LoadableComponent isPending={isPending} errorMessage={error?.message}>
            {users?.map((user) => (
              <UserListItem key={user.id} user={user} />
            ))}
          </LoadableComponent>
        </div>
      </div>
    </div>
  );
}; 