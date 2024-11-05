import React from 'react';
import { useParams } from 'wouter';

export const BookPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="vstack m-2 md:m-10 p-2 md:p-5 text-black rounded-md">
      <h1 className="text-4xl my-2 font-bold">Page for book {id}</h1>
    </div>
  );
};
