import React from 'react';
import { Link } from 'wouter';

import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state/state';
import { Menu } from './Menu';

export const Header: React.FC = () => {
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);

  return (
    <header>
      <div className="flex justify-between m-0 p-10 bg-white w-full transition-all">
        <h2 className="text-lg md:text-2xl text-1-1 font-bold mx-2 center">
          <Link to="/">Digital library</Link>
        </h2>
        <Menu />
        <div className="center">
          <Button
            variant="plate-grey"
            className="p-4 my-1 mx-2 font-bold"
            onClick={showLoginWindow}
          >
            Sign in
          </Button>
        </div>
      </div>
    </header>
  );
};
