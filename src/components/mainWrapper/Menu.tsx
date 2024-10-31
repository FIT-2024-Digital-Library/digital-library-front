import React, { useState } from 'react';
import { Link } from 'wouter';
import { routesList } from '@/routes';
import { Button } from '@/components/library/Button';
import { SliderCheckbox } from '../library/SliderCheckbox';
import clsx from 'clsx';

export const Menu: React.FC = () => {
  const links = routesList
    .filter((data) => data.label)
    .map((data) => (
      <Link
        to={data.url}
        className="my-1 mx-2 p-0 center font-bold"
        key={data.url}
      >
        <Button variant="inline">{data.label}</Button>
      </Link>
    ));

  const [mobileMenuShown, setMobileMenuShown] = useState(false);

  return (
    <nav className="flex justify-around">
      <div className="hidden md:flex justify-around">{links}</div>
      <div className="md:hidden text-center">
        <Button
          variant="inline"
          className="my-1 rounded:md w-full"
          onClick={() => setMobileMenuShown(!mobileMenuShown)}
        >
          <span>Menu</span>
          <SliderCheckbox checked={mobileMenuShown} variant="default" />
        </Button>
        <div
          className={clsx(
            'grid grid-cols-1 transition-all',
            mobileMenuShown ? 'opacity-1' : 'opacity-0'
          )}
        >
          {mobileMenuShown && links}
        </div>
      </div>
    </nav>
  );
};
