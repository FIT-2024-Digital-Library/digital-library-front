import React from 'react';
import { User, PrivilegesEnum, setPrivilegeForUserUsersUserIdSetPrivilegePost } from '@/api';
import { Button } from '@/components/library/Button';
import { DropDown } from '@/components/library/DropDown';
import { Icon } from '@/components/library/Icon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getUsersQueryOptions } from '@/query/queryHooks';

interface UserListItemProps {
  user: User;
}

const privilegeOptions: PrivilegesEnum[] = ['basic', 'moderator', 'admin'];

export const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const { mutate: setPrivilege } = useMutation({
    mutationFn: (privilege: PrivilegesEnum) =>
      dataExtractionWrapper(
        setPrivilegeForUserUsersUserIdSetPrivilegePost({
          path: { user_id: user.id },
          query: { privilege },
        })
      ),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: getUsersQueryOptions().queryKey });
    },
  });

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <div className="font-medium">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
      <DropDown
        buttonComponent={
          <Button variant="plate-grey" className="px-4 py-2">
            <span className="capitalize">{user.privileges}</span>
            <Icon icon="chevron-down" className="ml-2 text-sm" />
          </Button>
        }
      >
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
          {privilegeOptions.map((privilege) => (
            <Button
              key={privilege}
              variant="inline"
              className="w-full text-left px-4 py-2"
              onClick={() => setPrivilege(privilege)}
            >
              <span className="capitalize">{privilege}</span>
              {user.privileges === privilege && (
                <Icon icon="check" className="ml-2 text-green-500" />
              )}
            </Button>
          ))}
        </div>
      </DropDown>
    </div>
  );
}; 