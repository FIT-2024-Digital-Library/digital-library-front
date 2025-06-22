import { useBookCreate } from '@/query/mutationHooks';
import React, { useCallback, useState } from 'react';
import { useLocation } from 'wouter';
import { BookFormSync } from './BookFormSync';
import { BookEditData } from './BookFormSchema';
import { defaultTheme, getTheme } from './themes';

export const bookDraft: BookEditData = {
  theme: { value: defaultTheme.id, label: defaultTheme.name },
  title: '',
  author: { value: '', label: '' },
  publishedDate: undefined,
  description: undefined,
  imageQname: undefined,
  pdfQname: '',
};

export const AddBook: React.FC = () => {
  const [, setLocation] = useLocation();

  const { createBook, error: createBookError } = useBookCreate((response) => {
    setLocation(`/books/${response}`, { replace: true });
  });

  // Локальное состояние данных формы
  const [data, setData] = useState<BookEditData>(bookDraft);

  // Функция-обработчик для обновления конкретного поля
  const setDataByKey = useCallback(
    (key: keyof BookEditData, value: string) => {
      setData((prev: BookEditData) => {
        const updated = { ...prev } as BookEditData;
        switch (key) {
          case 'title':
            updated.title = value;
            break;
          case 'theme': {
            const themeObj = getTheme(parseInt(value));
            updated.theme = { value: themeObj.id, label: themeObj.name };
            break;
          }
          case 'author':
            updated.author = { value, label: value };
            break;
          case 'genre':
            updated.genre = value ? { value, label: value } : undefined;
            break;
          case 'publishedDate':
            updated.publishedDate = value ? parseInt(value) : undefined;
            break;
          case 'description':
            updated.description = value || undefined;
            break;
          case 'imageQname':
            updated.imageQname = value || undefined;
            break;
          case 'pdfQname':
            updated.pdfQname = value;
            break;
          default:
            break;
        }
        return updated;
      });
    },
    []
  );

  return (
    <div className="vstack">
      <BookFormSync
        data={data}
        setDataByKey={setDataByKey}
        submitAction={createBook}
      />
      {createBookError && (
        <span className="text-red-500 mx-3">{createBookError?.message}</span>
      )}
    </div>
  );
};
