import React from 'react';
import { Button } from '@/components/library/Button';
import { BookType, SelectOption } from '@/pages';
import { Icon } from '../library/Icon';

export interface BookDisplayProps {
  bookData: BookType;
  genreOption?: SelectOption;
  authorOption?: SelectOption;
}

export const BookDisplay: React.FC<BookDisplayProps> = ({
  bookData,
  genreOption,
  authorOption,
}) => {
  return (
    <div className="grid grid-cols-3">
      <div>
        <img
          src={bookData.coverUrl}
          alt={`${bookData.title}'s cover`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-2 vstack px-8">
        <h1 className="text-2xl font-bold mb-4">{bookData.title}</h1>
        {authorOption && (
          <h2 className="text-xl mb-2 italic">{authorOption.label}</h2>
        )}
        {genreOption && (
          <h2 className="text-xl mb-2 italic">{genreOption.label}</h2>
        )}
        <h2 className="text-xl mb-2">
          Published at {bookData.published.toDateString()}
        </h2>
        <p className="my-4">{bookData.description}</p>
        <a className="w-fit" href={bookData.pdfUrl}>
          <Button
            className="px-4 py-2 font-bold text-xl rounded-lg"
            variant="plate-grey"
          >
            <span>Download book</span>
            <Icon icon="download" />
          </Button>
        </a>
      </div>
    </div>
  );
};
