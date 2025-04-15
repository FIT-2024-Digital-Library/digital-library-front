import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { UserLoginData } from '@/components/auth/LoginForm';
import { loginUsersLoginPost, User } from '@/api';
import { getProfileQueryOptions } from '@/query/queryHooks';

export const useLogin = (onSuccess?: (response: User) => void) => {
  const queryClient = useQueryClient();
  const { mutate: login, ...rest } = useMutation({
    mutationFn: (data: UserLoginData) =>
      dataExtractionWrapper(
        loginUsersLoginPost({
          body: { ...data },
        })
      ),
    onSuccess: (response) => {
      queryClient.resetQueries({ queryKey: getProfileQueryOptions().queryKey });
      onSuccess?.(response);
    },
  });

  return { login, ...rest };
};
