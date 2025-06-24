import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { registerUsersRegisterPost, UserLogined } from '@/api';
import { getProfileQueryOptions } from '@/query/queryHooks';
import { UserRegisterData } from '@/components/auth/RegisterForm';

export const useRegister = (onSuccess?: (response: UserLogined) => void) => {
  const queryClient = useQueryClient();
  const { mutate: register, ...rest } = useMutation({
    mutationFn: (data: UserRegisterData) =>
      dataExtractionWrapper(
        registerUsersRegisterPost({
          body: { ...data, password: data.password1 },
        })
      ),
    onSuccess: (response) => {
      queryClient.resetQueries({ queryKey: getProfileQueryOptions().queryKey });
      onSuccess?.(response);
    },
  });

  return { register, ...rest };
};
