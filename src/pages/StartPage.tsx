import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state';
import { useProfile } from '@/query/queryHooks';
import React from 'react';
import { Link } from 'wouter';

export const StartPage: React.FC = () => {
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);
  const { profile } = useProfile();

  if (profile) {
    return (
      <div className="center vstack my-16">
        <div className="vstack items-center gap-6 w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Welcome back, {profile.name}!</h2>
          <div className="grid grid-cols-2 gap-6 w-full">
            <Link href="/books">
              <Button
                variant="plate-grey"
                className="p-6 font-bold rounded-lg w-full text-lg"
              >
                Browse Books
              </Button>
            </Link>
            {profile.privileges !== 'basic' && (
              <Link href="/books/add">
                <Button
                  variant="plate-grey"
                  className="p-6 font-bold rounded-lg w-full text-lg"
                >
                  Add Book
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="center vstack my-32">
      <div className="animate-slide-down mb-8">
        <h1 className="text-3xl md:text-4xl text-center m-2 text-1-9 font-bold tracking-wider">
          Embark on Your Journey
        </h1>
        <h1 className="text-3xl md:text-4xl text-center m-2 text-1-9 font-bold tracking-wider animate-text-shimmer">
          of Knowledge
        </h1>
      </div>
      <div className="animate-slide-up-delayed">
        <h1 className="text-4xl md:text-5xl text-center m-2 font-bold">
          <span className="animate-text-focus-in">Search.</span>{' '}
          <span className="animate-text-focus-in-delay-1">Download.</span>{' '}
          <span className="animate-text-focus-in-delay-2">Discover.</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-center m-2 text-1-5 animate-fade-in-delayed">
          Expand Your Horizons
        </h2>
      </div>
      <Button
        variant="plate-grey"
        className="p-6 mt-12 mx-2 text-xl font-bold rounded-lg animate-pulse-slow hover:scale-105 transition-transform"
        onClick={showLoginWindow}
      >
        Join Our Library
      </Button>
    </div>
  );
};
