import { useUser } from '@/query/queryHooks';
import React from 'react';
import { LoadableComponent } from '../library';
import { User } from '@/api';

interface SuspednedUserProps {
  userId: number;
  children: (user: User) => JSX.Element;
}

export const SuspendedUser: React.FC<SuspednedUserProps> = ({
  userId,
  children,
}) => {
  const { user, isPending, error } = useUser(userId);

  return (
    <LoadableComponent isPending={isPending} errorMessage={error?.message}>
      {user && children(user)}
    </LoadableComponent>
  );
};
