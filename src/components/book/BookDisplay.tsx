import React from 'react';
import { useBook } from '@/query/queryHooks/useBook';
import { LoadableComponent } from '../library/LoadableComponent';
import { getTheme } from './themes';

export interface BookDisplayProps {
  bookId: number;
}

export const BookDisplay: React.FC<BookDisplayProps> = ({ bookId }) => {
  const { book, isPending: isBookPending, error: bookError } = useBook(bookId);

  return (
    <LoadableComponent
      isPending={isBookPending}
      errorMessage={bookError?.message}
      animated
    >
      {book && getTheme(book.themeId).getComponent(book)}
    </LoadableComponent>
  );
};
