import React from 'react';
import { Button } from '@/components/library/Button';
import { Icon } from '@/components/library';
import { BookThemeComponent } from './themes';
import { getFileRealUrl } from '@/query';
import { SuspendedGenre } from '../SuspendedGenre';
import { SuspendedAuthor } from '../SuspendedAuthor';

export const WithoutCoverThemeComponennt: BookThemeComponent = ({ book }) => {
  return (
    <div className="center">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">{book?.title}</h1>
        <SuspendedAuthor authorId={book.author}>
          {(author) => (
            <h2 className="text-xl mb-2">
              Author: <span className="italic">{author.name}</span>
            </h2>
          )}
        </SuspendedAuthor>
        {book.genre && (
          <SuspendedGenre genreId={book.genre}>
            {(genre) => (
              <h2 className="text-xl mb-2">
                Genre: <span className="italic">{genre.name}</span>
              </h2>
            )}
          </SuspendedGenre>
        )}

        {book?.publishedDate ? (
          <h2 className="text-xl mb-2">
            Published at{' '}
            <span className="font-mono">{book?.publishedDate}</span>
          </h2>
        ) : (
          ''
        )}
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
