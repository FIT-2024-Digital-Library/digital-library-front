import React from 'react';
import { Link } from 'wouter';
import { useBook, useAuthor } from '@/query/queryHooks';
import { LoadableComponent } from '@/components/library';
import { getFileRealUrl } from '@/query';

interface BookCardProps {
  bookId: number;
}

export const BookCard: React.FC<BookCardProps> = ({ bookId }) => {
  const { book } = useBook(bookId);
  const { author } = useAuthor(book?.author);

  if (!book) return null;

  return (
    <Link
      to={`/books/${bookId}`}
      className="block hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden bg-white"
    >
      <div className="aspect-w-2 aspect-h-3 w-full">
        <img
          src={
            book.imageQname
              ? getFileRealUrl(book.imageQname)
              : 'https://via.placeholder.com/200x300?text=No+Cover'
          }
          alt={book.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/200x300?text=No+Cover';
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
          <div className="flex items-center bg-blue-100 px-2 py-1 rounded-full">
            <svg
              className="w-4 h-4 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              {book.avgMark && book.avgMark.toFixed(1)}
            </span>
          </div>
        </div>
        <LoadableComponent isPending={!author}>
          {author && <p className="text-sm text-gray-600">{author.name}</p>}
        </LoadableComponent>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {book.description}
        </p>
      </div>
    </Link>
  );
};
