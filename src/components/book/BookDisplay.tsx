import React from 'react';
import { Button } from '@/components/library/Button';
import { Icon } from '../library/Icon';
import { useBook } from '@/query/queryHooks/useBook';
import { LoadableComponent } from '../library/LoadableComponent';
import { useAuthor, useGenre } from '@/query/queryHooks';
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
