import React, { useState } from 'react';
import GenreFilter from './GenreFilter';

const SearchFilters = ({
  onFiltersChange,
  type = 'movie',
  initialFilters = {}
}) => {
  const [filters, setFilters] = useState({
    genres: initialFilters.genres || [],
    year: initialFilters.year || '',
    rating: initialFilters.rating || '',
    sortBy: initialFilters.sortBy || 'popularity.desc',
    ...initialFilters
  });

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleGenreChange = (genres) => {
    handleFilterChange({ genres });
  };

  const handleYearChange = (e) => {
    handleFilterChange({ year: e.target.value });
  };

  const handleRatingChange = (e) => {
    handleFilterChange({ rating: e.target.value });
  };

  const handleSortChange = (e) => {
    handleFilterChange({ sortBy: e.target.value });
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      genres: [],
      year: '',
      rating: '',
      sortBy: 'popularity.desc'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Filters
        </h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Genres */}
        <div className="md:col-span-2 lg:col-span-4">
          <GenreFilter
            selectedGenres={filters.genres}
            onGenreChange={handleGenreChange}
            type={type}
          />
        </div>

        {/* Release Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Release Year
          </label>
          <select
            value={filters.year}
            onChange={handleYearChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Any Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Minimum Rating
          </label>
          <select
            value={filters.rating}
            onChange={handleRatingChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Any Rating</option>
            <option value="9">9+ Stars</option>
            <option value="8">8+ Stars</option>
            <option value="7">7+ Stars</option>
            <option value="6">6+ Stars</option>
            <option value="5">5+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="popularity.asc">Least Popular</option>
            <option value="vote_average.desc">Highest Rated</option>
            <option value="vote_average.asc">Lowest Rated</option>
            <option value="release_date.desc">Newest First</option>
            <option value="release_date.asc">Oldest First</option>
            <option value="title.asc">Title A-Z</option>
            <option value="title.desc">Title Z-A</option>
          </select>
        </div>

        {/* Apply Filters Button */}
        <div className="flex items-end">
          <button
            onClick={() => onFiltersChange(filters)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;