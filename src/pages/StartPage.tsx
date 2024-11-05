import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state';
import React from 'react';

export const StartPage: React.FC = () => {
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);

  return (
    <div className="center vstack my-32">
      <h1 className="text-2xl text-center m-2 text-1-9">
        Embark on Your Journey of Knowledge
      </h1>
      <h1 className="text-4xl text-center m-2 font-bold">
        Search. Download. Discover. Expand Your Horizons.
      </h1>
      <Button
        variant="plate-grey"
        className="p-4 my-1 mx-2 font-bold rounded-lg"
        onClick={showLoginWindow}
      >
        Join us
      </Button>
    </div>
  );
};
