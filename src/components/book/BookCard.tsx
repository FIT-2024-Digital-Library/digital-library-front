import React from 'react';
import { Link } from 'wouter';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    description: string;
  };
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link href={`/books/${book.id}`}>
      <a className="block hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden bg-white">
        <div className="aspect-w-2 aspect-h-3 w-full">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback изображение при ошибке загрузки
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x300?text=No+Cover';
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{book.description}</p>
        </div>
      </a>
    </Link>
  );
};