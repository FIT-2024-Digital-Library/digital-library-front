import React from 'react';
import { Button } from '@/components/library/Button';
import { SelectOption } from '@/pages';
import { Icon } from '../library/Icon';
import { Book } from '@/api';
import { useBook } from '@/query/queryHooks/useBook';
import { LoadableComponent } from '../library/LoadableComponent';
import { useAuthor, useGenre } from '@/query/queryHooks';

export interface BookDisplayProps {
  bookId: number;
}

export const BookDisplay: React.FC<BookDisplayProps> = ({ bookId }) => {
  const { book, isPending: isBookPending, error: bookError } = useBook(bookId);
  const {
    author,
    isPending: isAuthorPending,
    error: authorError,
  } = useAuthor(book?.author);
  const {
    genre,
    isPending: isGenrePending,
    error: genreError,
  } = useGenre(book?.genre);

  return (
    <LoadableComponent
      isPending={isBookPending}
      errorMessage={bookError?.message}
      animated
    >
      <div className="grid grid-cols-3">
        <div>
          <img
            src={book?.imageUrl === null ? '' : book?.imageUrl}
            alt={`${book?.title}'s cover`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-2 vstack px-8">
          <h1 className="text-2xl font-bold mb-4">{book?.title}</h1>
          <LoadableComponent
            isPending={isAuthorPending}
            errorMessage={authorError?.message}
            animated
          >
            {author && <h2 className="text-xl mb-2 italic">{author.name}</h2>}
          </LoadableComponent>
          <LoadableComponent
            isPending={isGenrePending}
            errorMessage={genreError?.message}
            animated
          >
            {genre && <h2 className="text-xl mb-2 italic">{genre.name}</h2>}
          </LoadableComponent>

          <h2 className="text-xl mb-2">Published at {book?.publishedDate}</h2>
          <p className="my-4">{book?.description}</p>
          <a className="w-fit" href={book?.pdfUrl}>
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
    </LoadableComponent>
  );
};
