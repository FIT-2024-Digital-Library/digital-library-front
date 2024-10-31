import React from 'react';
import { Link } from 'wouter';

import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state/state';
import { Menu } from './Menu';

export const Header: React.FC = () => {
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);
  const showRegisterWindow = useAppStore((state) => state.showRegisterWindow);

  return (
    <header>
      <div className="flex justify-between m-0 p-2 bg-1-7 w-full transition-all">
        <h2 className="text-lg md:text-2xl text-1-1 font-bold mx-2 center">
          <Link to="/">App</Link>
        </h2>
        <Menu />
        <div className="center">
          <Button
            variant="bordered"
            className="p-1 my-1 mx-2"
            onClick={showLoginWindow}
          >
            Log in
          </Button>
          <div className="hidden md:block">
            <Button
              variant="plate"
              className="p-1 my-1 mx-2"
              onClick={showRegisterWindow}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
