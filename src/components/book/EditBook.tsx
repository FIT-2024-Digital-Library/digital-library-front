import { useBookUpdate } from '@/query/mutationHooks';
import React, { useCallback } from 'react';
import { BookForm, BookEditData } from './BookForm';
import { getTheme } from './themes';
import { useBook } from '@/query/queryHooks';
import { LoadableComponent } from '../library/LoadableComponent';
import { SuspendedAuthor } from './SuspendedAuthor';
import { SuspendedGenre } from './SuspendedGenre';
import { Author, Book, Genre } from '@/api';

interface EditBookProps {
  bookId: number;
  setIsEdit: (isEdit: boolean) => void;
}

export const EditBook: React.FC<EditBookProps> = ({ bookId, setIsEdit }) => {
  const { book, isPending, error } = useBook(bookId);

  const { updateBook, error: updateBookError } = useBookUpdate(bookId, () => {
    setIsEdit(false);
  });

  const getBookEditData = useCallback(
    (book: Book, author: Author, genre?: Genre) =>
      ({
        ...book,
        theme: {
          value: book.themeId,
          label: getTheme(book.themeId).name,
        },
        author: {
          value: author.name,
          label: author.name,
        },
        genre: genre
          ? {
              value: genre.name,
              label: genre.name,
            }
          : null,
      } satisfies BookEditData),
    []
  );

  return (
    <div className="vstack">
      <LoadableComponent isPending={isPending} errorMessage={error?.message}>
        {book && (
          <SuspendedAuthor authorId={book.author}>
            {(author) => (
              <>
                {book.genre !== null ? (
                  <SuspendedGenre genreId={book.genre}>
                    {(genre) => (
                      <BookForm
                        defaultData={getBookEditData(book, author, genre)}
                        submitAction={updateBook}
                      />
                    )}
                  </SuspendedGenre>
                ) : (
                  <BookForm
                    defaultData={getBookEditData(book, author)}
                    submitAction={updateBook}
                  />
                )}
              </>
            )}
          </SuspendedAuthor>
        )}
      </LoadableComponent>
      {updateBookError && (
        <span className="text-red-500 mx-3">{updateBookError?.message}</span>
      )}
    </div>
  );
};
