import React from 'react';
import { Button } from '@/components/library/Button';
import { Icon } from '@/components/library';
import { BookThemeComponent } from './themes';
import { getFileRealUrl } from '@/query';
import { SuspendedAuthor } from '../SuspendedAuthor';
import { SuspendedGenre } from '../SuspendedGenre';

export const ComposedThemeComponent: BookThemeComponent = ({ book }) => {
  return (
    <div className="center">
      <div className="w-1/2 vstack">
        <h1 className="text-xl font-bold mb-4 around">
          <a className="w-fit mr-2" href={getFileRealUrl(book?.pdfQname)}>
            <Button
              className="p-2 font-bold text-xl rounded-lg"
              variant="plate-grey"
            >
              <Icon icon="download" />
            </Button>
          </a>
          <span className="text-2xl">{book.title}</span>
          {book.genre && (
            <SuspendedGenre genreId={book.genre}>
              {(genre) => <span className="italic">of {genre.name}</span>}
            </SuspendedGenre>
          )}
          <SuspendedAuthor authorId={book.author}>
            {(author) => <span className="italic">by {author.name}</span>}
          </SuspendedAuthor>
          {book?.publishedDate ? (
            <div className="inline">
              <span className="mx-1">from</span>
              <span className="font-mono">{book?.publishedDate}</span>
            </div>
          ) : (
            ''
          )}
        </h1>

        <div className="grid grid-cols-3 gap-x-2">
          <div className="center">
            {book?.imageQname && book?.imageQname !== null && (
              <img
                src={getFileRealUrl(book?.imageQname)}
                alt={`${book?.title}'s cover`}
                className="w-full object-cover"
              />
            )}
          </div>
          <div className="col-span-2 center">
            <p className="my-4">{book?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
