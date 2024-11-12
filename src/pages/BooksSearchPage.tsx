import React, { useState } from 'react';
import { Toggle } from '@/components/library/Toggle';
import { Button } from '@/components/library/Button';

export const BooksSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSemanticSearch, setIsSemanticSearch] = useState(false);

  const [structuredSearch, setStructuredSearch] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
  });

  const handleSearch = () => {
    if (isSemanticSearch) {
      console.log('Semantic Searching for:', searchQuery);
      // Логика семантического поиска
    } else {
      console.log('Structured Search:', structuredSearch);
      // Логика структурированного поиска
    }
  };

  const handleStructuredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStructuredSearch({
      ...structuredSearch,
      [e.target.name]: e.target.value,
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                className="w-full px-4 py-3 rounded-xl border border-gray-200  focus:border-transparent transition-all duration-200 ease-in-out"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200  focus:border-transparent transition-all duration-200 ease-in-out"
                placeholder="Publication Year"
                value={structuredSearch.year}
                onChange={handleStructuredChange}
              />
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button
              variant="plate-black"
              className="w-[300px] px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium text-lg transition-all duration-200"
              onClick={handleSearch}
            >
              Search Books
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-gray-50 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or try different keywords</p>
          </div>
        </div>
      </div>
    </div>
  );
};