import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { logoutUserUsersLogoutPost } from '@/api';
import { getProfileQueryOptions } from '@/query/queryHooks';

export const useLogout = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: logout, ...rest } = useMutation({
    mutationFn: () => dataExtractionWrapper(logoutUserUsersLogoutPost()),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: getProfileQueryOptions().queryKey });
      onSuccess?.();
    },
  });

  return { logout, ...rest };
};
