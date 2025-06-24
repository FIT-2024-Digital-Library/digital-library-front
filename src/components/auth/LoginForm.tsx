import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import { useAppStore } from '@/state';
import { useLogin } from '@/query/mutationHooks';

const userLoginScheme = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be more than or equal to 8 symbols'),
});
export type UserLoginData = z.infer<typeof userLoginScheme>;

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>({
    resolver: zodResolver(userLoginScheme),
  });

  const closeAuthWindow = useAppStore((state) => state.closeAuthWindow);

  const { login, error } = useLogin(() => {
    closeAuthWindow();
  });

  return (
    <form
      className="vstack w-full p-2"
      onSubmit={handleSubmit((data) => login(data))}
    >
      <FormItem
        className="vstack p-1 w-full text-black"
        errorMessage={errors.email?.message}
      >
        <label htmlFor="email">Username or email</label>
        <input
          id="email"
          className="w-full p-2 bg-transparent border-black border-b"
          {...register('email')}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.password?.message}
      >
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="w-full p-2 bg-transparent border-black border-b"
          {...register('password')}
          type="password"
        />
      </FormItem>
      {error && (
        <FormItem className="vstack p-1 w-full" errorMessage={error.message} />
      )}
      <Button variant="plate-black" type="submit" className="m-2 my-4">
        Sign in
      </Button>
    </form>
  );
};
