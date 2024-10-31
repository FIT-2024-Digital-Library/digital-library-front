import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';

const userRegisterScheme = z
  .object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
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

  const registerUser: SubmitHandler<UserRegisterData> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="vstack w-full p-2 text-white"
      onSubmit={handleSubmit(registerUser)}
    >
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.email?.message}
      >
        <input
          placeholder="Email"
          className="w-full p-2 bg-1-2 focus:bg-1-3 rounded-md placeholder-shown:text-1-8"
          {...register('email')}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.password1?.message}
      >
        <input
          placeholder="Create password"
          className="w-full p-2 bg-1-2 focus:bg-1-3 rounded-md"
          {...register('password1')}
          type="password"
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.password2?.message}
      >
        <input
          placeholder="Repeat password"
          className="w-full p-2 bg-1-2 focus:bg-1-3 rounded-md"
          {...register('password2')}
          type="password"
        />
      </FormItem>
      <Button variant="plate" type="submit" className="m-2">
        Sign up
      </Button>
    </form>
  );
};
