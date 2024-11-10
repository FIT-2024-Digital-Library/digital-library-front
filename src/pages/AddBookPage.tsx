import React from 'react';

import { BookEdit } from '@/components/book/BookEdit';

export const AddBookPage: React.FC = () => {
  return (
    <div className="vstack mx-2 md:mx-10 xl:mx-32 px-2 md:px-5 text-black rounded-md">
      <BookEdit />
    </div>
  );
};
