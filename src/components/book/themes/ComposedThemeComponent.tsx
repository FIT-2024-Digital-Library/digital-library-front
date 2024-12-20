import React from 'react';
import { Button } from '@/components/library/Button';
import { Icon, LoadableComponent } from '@/components/library';
import { useAuthor, useGenre } from '@/query/queryHooks';
import { BookThemeComponent } from './themes';
import { getFileRealUrl } from '../BookCard';

export const ComposedThemeComponent: BookThemeComponent = ({ book }) => {
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
        <LoadableComponent
          isPending={isAuthorPending}
          errorMessage={authorError?.message}
          animated
        >
          <h1 className="text-xl font-bold mb-4 around">
            <span className="text-2xl">{book?.title}</span>
            {genre && <span className="italic">of {genre.name}</span>}
            {author && <span className="italic">by {author.name}</span>}
            {book?.publishedDate && (
              <div className="inline">
                <span className="mx-1">from</span>
                <span className="font-mono">{book?.publishedDate}</span>
              </div>
            )}
          </h1>
        </LoadableComponent>

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
