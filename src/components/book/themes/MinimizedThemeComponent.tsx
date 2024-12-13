import React from 'react';
import { Button } from '@/components/library/Button';
import { Icon, LoadableComponent } from '@/components/library';
import { useAuthor } from '@/query/queryHooks';
import { BookThemeComponent } from './themes';

export const MinimizedThemeComponent: BookThemeComponent = ({ book }) => {
  const {
    author,
    isPending: isAuthorPending,
    error: authorError,
  } = useAuthor(book.author);

  return (
    <div className="center">
      <div className="w-1/2">
        <div className="flex justify-left">
          <a className="w-fit mx-2" href={book?.pdfUrl}>
            <Button
              className="p-2 font-bold text-xl rounded-lg"
              variant="plate-grey"
            >
              <Icon icon="download" />
            </Button>
          </a>
          <h1 className="text-2xl font-bold mb-4">{book?.title}</h1>
        </div>
        <LoadableComponent
          isPending={isAuthorPending}
          errorMessage={authorError?.message}
          animated
        >
          {author && (
            <h2 className="text-xl mb-2">
              Author: <span className="italic">{author.name}</span>
            </h2>
          )}
        </LoadableComponent>
      </div>
    </div>
  );
};
