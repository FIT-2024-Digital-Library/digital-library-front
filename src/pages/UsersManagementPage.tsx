import React from 'react';
import { useUsers } from '@/query/queryHooks/useUsers';
import { UserListItem } from '@/components/user/UserListItem';
import { LoadableComponent } from '@/components/library';
import { useProfile } from '@/query/queryHooks';

export const UsersManagementPage: React.FC = () => {
  const { profile } = useProfile();
  const { users, isPending, error } = useUsers();

  return (
    <div className="center">
      <div className="w-full max-w-3xl p-6">
        <h1 className="text-2xl font-bold mb-6">Users Management</h1>
        {!profile || profile.privileges !== 'admin' ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            У вас нет прав для просмотра этой страницы. Доступ разрешен только
            администраторам.
          </div>
        ) : (
          <LoadableComponent
            isPending={isPending}
            errorMessage={error?.message}
          >
            <div className="bg-white rounded-lg shadow">
              {users?.map((user) => (
                <UserListItem key={user.id} user={user} />
              ))}
            </div>
          </LoadableComponent>
        )}
      </div>
    </div>
  );
};
