import React from 'react';
import { Button } from '@/components/library/Button';
import { Icon, LoadableComponent } from '@/components/library';
import { useAuthor, useGenre } from '@/query/queryHooks';
import { BookThemeComponent } from './themes';
import { getFileRealUrl } from '@/query';

export const DefaultThemeComponent: BookThemeComponent = ({ book }) => {
  const {
    author,
    isPending: isAuthorPending,
    error: authorError,
  } = useAuthor(book.author);
  const {
    genre,
    isPending: isGenrePending,
    error: genreError,
  } = useGenre(book.genre);

  return (
    <div className="grid grid-cols-3">
      <div>
        {book?.imageQname && book?.imageQname !== null && (
          <img
            src={getFileRealUrl(book?.imageQname)}
            alt={`${book?.title}'s cover`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="col-span-2 vstack px-8">
        <h1 className="text-2xl font-bold mb-4">{book?.title}</h1>
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
        <LoadableComponent
          isPending={isGenrePending}
          errorMessage={genreError?.message}
          animated
        >
          {genre && (
            <h2 className="text-xl mb-2">
              Genre: <span className="italic">{genre.name}</span>
            </h2>
          )}
        </LoadableComponent>

        <h2 className="text-xl mb-2">
          Published at <span className="font-mono">{book?.publishedDate}</span>
        </h2>
        <p className="my-4">{book?.description}</p>
        <a className="w-fit" href={getFileRealUrl(book?.pdfQname)}>
          <Button
            className="px-4 py-2 font-bold text-xl rounded-lg"
            variant="plate-grey"
          >
            <span>Download book</span>
            <Icon icon="download" />
          </Button>
        </a>
      </div>
    </div>
  );
};
