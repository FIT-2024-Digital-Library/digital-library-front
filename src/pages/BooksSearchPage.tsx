import React, { useState } from 'react';
import { Toggle } from '@/components/library/Toggle';
import { Button } from '@/components/library/Button';
import { BookCard } from '@/components/book/BookCard';
import { useBooks, BooksSearchParams } from '@/query/queryHooks';

export const BooksSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSemanticSearch, setIsSemanticSearch] = useState(false);
  const [searchParams, setSearchParams] = useState<
    BooksSearchParams | undefined
  >(undefined);
  const [hasSearched, setHasSearched] = useState(false);

  const [structuredSearch, setStructuredSearch] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    minRating: 0,
    maxRating: 5,
  });

  const { booksIds, isPending, error } = useBooks(
    hasSearched ? searchParams : undefined
  );

  const handleSearch = () => {
    setHasSearched(true);
    setSearchParams(
      isSemanticSearch
        ? { description: searchQuery }
        : {
            title: structuredSearch.title || undefined,
            author: structuredSearch.author || undefined,
            genre: structuredSearch.genre || undefined,
            published_date: structuredSearch.year || undefined,
            min_mark: structuredSearch.minRating || undefined,
            max_mark: structuredSearch.maxRating || undefined,
          }
    );
  };

  const handleStructuredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === 'range' ? parseFloat(e.target.value) : e.target.value;
    setStructuredSearch({
      ...structuredSearch,
      [e.target.name]: value,
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Find your book</h1>
            <div className="flex items-center gap-3">
              <Toggle
                label="Semantic Search"
                checked={isSemanticSearch}
                onChange={setIsSemanticSearch}
              />
            </div>
          </div>

          {isSemanticSearch ? (
            <div className="space-y-4">
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                placeholder='Try: "adventures in ancient Greece" or "science fiction about space travel"'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="search"
                className="w-full px-4 py-3"
                onClick={handleSearch}
                loading={isPending}
              >
                Search Books
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-transparent transition-all duration-200 ease-in-out"
                  placeholder="Book Title"
                  value={structuredSearch.title}
                  onChange={handleStructuredChange}
                />
                <input
                  type="text"
                  name="author"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-transparent transition-all duration-200 ease-in-out"
                  placeholder="Author Name"
                  value={structuredSearch.author}
                  onChange={handleStructuredChange}
                />
                <input
                  type="text"
                  name="genre"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-transparent transition-all duration-200 ease-in-out"
                  placeholder="Genre"
                  value={structuredSearch.genre}
                  onChange={handleStructuredChange}
                />
                <input
                  type="number"
                  name="year"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-transparent transition-all duration-200 ease-in-out"
                  placeholder="Publication Year"
                  value={structuredSearch.year}
                  onChange={handleStructuredChange}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating Range: {structuredSearch.minRating} -{' '}
                  {structuredSearch.maxRating}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Min Rating
                    </label>
                    <input
                      type="range"
                      name="minRating"
                      min="0"
                      max="5"
                      step="0.1"
                      value={structuredSearch.minRating}
                      onChange={handleStructuredChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Max Rating
                    </label>
                    <input
                      type="range"
                      name="maxRating"
                      min="0"
                      max="5"
                      step="0.1"
                      value={structuredSearch.maxRating}
                      onChange={handleStructuredChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <Button
                variant="search"
                className="w-full mt-4 px-4 py-3"
                onClick={handleSearch}
                loading={isPending}
              >
                Search Books
              </Button>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="mt-12 border-t pt-8">
          {isPending ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-[300px] rounded-xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-red-50 mb-4">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error Loading Results
              </h3>
              <p className="text-gray-500">
                {error.message ||
                  'An unexpected error occurred. Please try again.'}
              </p>
              <Button variant="search" className="mt-4" onClick={handleSearch}>
                Retry Search
              </Button>
            </div>
          ) : !hasSearched ? (
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-gray-50 mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start Your Search
              </h3>
              <p className="text-gray-500">
                Enter your search criteria and click the search button
              </p>
            </div>
          ) : booksIds && booksIds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {booksIds.map((bookId) => (
                <BookCard key={bookId} bookId={bookId} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-gray-50 mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or try different keywords
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
