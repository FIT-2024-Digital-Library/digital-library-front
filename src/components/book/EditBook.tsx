import { useBookUpdate } from '@/query/mutationHooks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BookForm, BookEditData } from './BookForm';
import { getTheme } from './themes';
import { useBook } from '@/query/queryHooks';
import { LoadableComponent } from '../library/LoadableComponent';
import { Author, Book, Genre } from '@/api';
import * as Y from 'yjs';
import { useY } from 'react-yjs';
import { WebsocketProvider } from 'y-websocket';
import { BookFormSync } from './BookFormSync';

const doc = new Y.Doc();
new WebsocketProvider('ws://localhost:1234', 'book-edit', doc);

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

  const yDataAccessor = useMemo(
    () => doc.getMap<string>(String(bookId)),
    [bookId]
  );
  const setDataByKey = useCallback(
    (key: string, value: string) => {
      yDataAccessor.set(key, value);
    },
    [yDataAccessor]
  );
  const yData = useY(yDataAccessor);
  const [data, setData] = useState<BookEditData>();

  // Update editable data by collaborative data
  useEffect(() => {
    if (!yData['defined']) return;
    const theme = getTheme(parseInt(yData['theme']));
    setData({
      title: yData['title'],
      theme: { value: theme.id, label: theme.name },
      author: { value: yData['author'], label: yData['author'] },
      genre: yData['genre']
        ? { value: yData['genre'], label: yData['genre'] }
        : undefined,
      pdfQname: yData['pdfQname'],
      imageQname: yData['imageQname'] ? yData['imageQname'] : undefined,
      description: yData['description'] ? yData['description'] : undefined,
      publishedDate: yData['publishedDate']
        ? parseInt(yData['publishedDate'])
        : undefined,
    });
    console.log(yData);
  }, [yData, setData]);

  // Update collaborative data by book from back
  useEffect(() => {
    if (yData['defined']) return;
    if (!book) return;
    const { avgMark, marksCount, themeId, ...rest } = book;
    const m = new Map(Object.entries(rest));
    m.set('theme', String(themeId));
    for (const [key, value] of m.entries()) {
      setDataByKey(key, String(value));
    }
    setDataByKey('defined', 'true');
  }, [yData, book, setDataByKey]);

  return (
    <div className="vstack">
      <LoadableComponent isPending={!data}>
        {data && (
          <BookFormSync
            data={data}
            setDataByKey={setDataByKey}
            submitAction={updateBook}
          />
        )}
      </LoadableComponent>
      {/* <LoadableComponent isPending={isPending} errorMessage={error?.message}>
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
      )} */}
    </div>
  );
};
