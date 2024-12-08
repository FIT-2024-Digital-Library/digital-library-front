import React from 'react';
import { Link } from 'wouter';

import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state/state';
import { dataExtractionWrapper, useProfile } from '@/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUserUsersLogoutPost } from '@/api';

export const Header: React.FC = () => {
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);

  const { profile } = useProfile();

  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: () => dataExtractionWrapper(logoutUserUsersLogoutPost()),
    onSuccess: () => queryClient.resetQueries({ queryKey: ['profile'] }),
  });

  return (
    <header>
      <div className="grid grid-cols-4 m-0 p-10 bg-white w-full transition-all">
        <h2 className="flex justify-start items-center text-lg md:text-2xl text-1-1 font-bold">
          <Link to="/">Digital library</Link>
        </h2>
        <div className="col-span-2 p-2">
          <Link to="/books" className="w-full">
            <Button className="w-full" variant="plate-grey">
              Search
            </Button>
          </Link>
        </div>
        <div className="flex justify-end items-center">
          {profile ? (
            <>
              <span>{profile.name}</span>
              <Button
                variant="plate-grey"
                className="p-4 my-1 mx-2 font-bold"
                onClick={() => logout()}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button
              variant="plate-grey"
              className="p-4 my-1 mx-2 font-bold"
              onClick={showLoginWindow}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
