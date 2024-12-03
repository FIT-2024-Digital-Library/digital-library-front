import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { registerUsersRegisterPost } from '@/api';
import { useAppStore } from '@/state';

const userRegisterScheme = z
  .object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    name: z.string().min(1, 'Email is required'),
    password1: z.string().min(8, 'Password must be >= 8 symbols'),
    password2: z.string().min(8, 'Repetition of password is required'),
  })
  .refine((data) => data.password1 === data.password2, {
    message: 'Repeat your password correctly',
    path: ['password2'],
  });
export type UserRegisterData = z.infer<typeof userRegisterScheme>;

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterData>({
    resolver: zodResolver(userRegisterScheme),
  });

  const closeAuthWindow = useAppStore((state) => state.closeAuthWindow);

  const queryClient = useQueryClient();
  const { mutate: registerUser, error } = useMutation({
    mutationFn: (data: UserRegisterData) =>
      dataExtractionWrapper(
        registerUsersRegisterPost({
          body: { ...data, password: data.password1 },
        })
      ),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['profile'] });
      closeAuthWindow();
    },
  });

  return (
    <form
      className="vstack w-full p-2"
      onSubmit={handleSubmit((data) => registerUser(data))}
    >
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.email?.message}
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="w-full p-2 bg-transparent border-black border-b"
          {...register('email')}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.name?.message}
      >
        <label htmlFor="name">Name</label>
        <input
          id="name"
          className="w-full p-2 bg-transparent border-black border-b"
          {...register('name')}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.password1?.message}
      >
        <label htmlFor="password1">Password</label>
        <input
          id="password1"
          className="w-full p-2 bg-transparent border-black border-b"
          {...register('password1')}
          type="password"
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.password2?.message}
      >
        <label htmlFor="password2">Repeat password</label>
        <input
          id="password2"
          className="w-full p-2 bg-transparent border-black border-b"
          {...register('password2')}
          type="password"
        />
      </FormItem>
      {error && (
        <FormItem className="vstack p-1 w-full" errorMessage={error.message} />
      )}
      <Button variant="plate-black" type="submit" className="m-2 my-4">
        Create account
      </Button>
    </form>
  );
};
