import React, { useState } from 'react';
import { Toggle } from '@/components/library/Toggle';
import { Button } from '@/components/library/Button';
import { BookCard } from '@/components/book/BookCard';

// Временный интерфейс для книги
interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  averageRating?: number;
}

export const BooksSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSemanticSearch, setIsSemanticSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const [structuredSearch, setStructuredSearch] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    minRating: 0,
    maxRating: 5,
  });

  // Временные данные для демонстрации
  const mockSearch = () => {
    const mockResults: Book[] = [
      {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        coverUrl: 'https://example.com/gatsby.jpg',
        description: 'A story of the fabulously wealthy Jay Gatsby',
        averageRating: 4.5
      },
      {
        id: '2',
        title: '1984',
        author: 'George Orwell',
        coverUrl: 'https://upload.wikimedia.org/wikipedia/ru/thumb/2/2e/1984_cover.jpg/401px-1984_cover.jpg?20200527161122',
        description: 'A dystopian social science fiction novel',
        averageRating: 4.8
      },
      // Можно добавить больше тестовых данных
    ];
    setSearchResults(mockResults);
  };

  const handleSearch = () => {
    mockSearch(); // Временно используем мок-данные
  };

  const handleStructuredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'range' ? parseFloat(e.target.value) : e.target.value;
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
                  Rating Range: {structuredSearch.minRating} - {structuredSearch.maxRating}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Min Rating</label>
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
                    <label className="block text-xs text-gray-500 mb-1">Max Rating</label>
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
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button
              variant="search"
              className="w-[300px] px-8 py-3"
              onClick={handleSearch}
            >
              Search Books
            </Button>
          </div>
        </div>

        {/* Результаты поиска */}
        <div className="mt-12 border-t pt-8">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-gray-50 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or try different keywords</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};