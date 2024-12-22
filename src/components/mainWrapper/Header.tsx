import React from 'react';
import { Link } from 'wouter';

import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state/state';
import { dataExtractionWrapper } from '@/query';
import { getProfileQueryOptions, useProfile } from '@/query/queryHooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUserUsersLogoutPost } from '@/api';
import { DropDown } from '@/components/library/DropDown';
import { Icon } from '@/components/library/Icon';

export const Header: React.FC = () => {
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);

  const { profile } = useProfile();

  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: () => dataExtractionWrapper(logoutUserUsersLogoutPost()),
    onSuccess: () =>
      queryClient.resetQueries({ queryKey: getProfileQueryOptions().queryKey }),
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
            <div className="relative inline-block">
              <DropDown
                buttonComponent={
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-1-11 rounded-full px-4 py-2 transition-colors">
                    <Icon icon="user" className="text-xl" />
                    <span className="font-medium">{profile.name}</span>
                    <Icon icon="chevron-down" className="text-sm" />
                  </div>
                }
              >
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <div className="px-4 py-2 border-b">
                    <div className="font-medium">{profile.name}</div>
                    <div className="text-sm text-gray-500">{profile.email}</div>
                    <div className="text-xs text-gray-400 capitalize">
                      {profile.privileges} privileges
                    </div>
                  </div>
                  {profile.privileges === 'admin' && (
                    <Link to="/users/manage">
                      <Button variant="inline" className="w-full text-left px-4 py-2">
                        Manage Users
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="inline"
                    className="w-full text-left px-4 py-2 text-red-600 hover:text-red-700"
                    onClick={() => logout()}
                  >
                    Sign out
                  </Button>
                </div>
              </DropDown>
            </div>
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
