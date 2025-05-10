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

  const setBookData = useCallback(
    (book: Book) => {
      const { avgMark, marksCount, themeId, ...rest } = book;
      const m = new Map(Object.entries(rest));
      m.set('theme', String(themeId));
      for (const [key, value] of m.entries()) {
        setDataByKey(key, value !== null ? String(value) : '');
      }
      setDataByKey('defined', 'true');
    },
    [setDataByKey]
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
    console.log('Y:');
    console.log(yData);
  }, [yData, setData]);
  useEffect(() => {
    console.log('State:');
    console.log(data);
  }, [data]);
  // Update collaborative data by book from back
  useEffect(() => {
    if (yData['defined']) return;
    if (!book) return;
    setBookData(book);
  }, [yData, book, setBookData]);

  return (
    <div className="vstack">
      <LoadableComponent
        isPending={!data || isPending}
        errorMessage={error?.message}
      >
        {data && (
          <BookFormSync
            data={data}
            setDataByKey={setDataByKey}
            submitAction={updateBook}
            resetAction={book && (() => setBookData(book))}
          />
        )}
      </LoadableComponent>
      {updateBookError && (
        <span className="text-red-500 mx-3">{updateBookError?.message}</span>
      )}
    </div>
  );
};
