import React from 'react';

import { AddBook } from '@/components/book/AddBook';

export const AddBookPage: React.FC = () => {
  return (
    <div className="vstack mx-2 md:mx-10 xl:mx-32 px-2 md:px-5 text-black rounded-md">
      <AddBook />
    </div>
  );
};
