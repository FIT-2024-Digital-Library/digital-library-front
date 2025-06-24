import { useMutation, useQueryClient } from '@tanstack/react-query';

import { dataExtractionWrapper } from '@/query';
import { getUsersQueryOptions } from '@/query/queryHooks';
import {
  PrivilegesEnum,
  setPrivilegeForUserUsersUserIdSetPrivilegePost,
  User,
} from '@/api';

export const usePrivilegeSet = (
  userId: number,
  onSuccess?: (user: User) => void
) => {
  const queryClient = useQueryClient();
  const { mutate: setPrivilege, ...rest } = useMutation({
    mutationFn: (privilege: PrivilegesEnum) =>
      dataExtractionWrapper(
        setPrivilegeForUserUsersUserIdSetPrivilegePost({
          path: { user_id: userId },
          query: { privilege },
        })
      ),
    onSuccess: (response) => {
      queryClient.resetQueries({ queryKey: getUsersQueryOptions().queryKey });
      onSuccess?.(response);
    },
  });

  return { setPrivilege, ...rest };
};
