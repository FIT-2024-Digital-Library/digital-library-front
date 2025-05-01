import { useBookCreate } from '@/query/mutationHooks';
import React from 'react';
import { useLocation } from 'wouter';
import { BookForm, BookEditData } from './BookForm';
import { defaultTheme } from './themes';

export const bookDraft: BookEditData = {
  theme: { value: defaultTheme.id, label: defaultTheme.name },
  title: '',
  author: { value: '', label: '' },
  genre: null,
  publishedDate: 0,
  description: '',
  imageQname: '',
  pdfQname: '',
};

export const AddBook: React.FC = () => {
  const [, setLocation] = useLocation();

  const { createBook, error: createBookError } = useBookCreate((response) => {
    setLocation(`/books/${response}`, { replace: true });
  });

  return (
    <div className="vstack">
      <BookForm defaultData={bookDraft} submitAction={createBook} />
      {createBookError && (
        <span className="text-red-500 mx-3">{createBookError?.message}</span>
      )}
    </div>
  );
};
