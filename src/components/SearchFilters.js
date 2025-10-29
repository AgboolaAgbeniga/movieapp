import React, { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
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

  const SelectItem = ({ children, value }) => (
    <Select.Item
      value={value}
      className="relative flex items-center px-8 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none cursor-pointer"
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
        <CheckIcon className="w-4 h-4" />
      </Select.ItemIndicator>
    </Select.Item>
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Filters
        </h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Release Year
          </label>
          <Select.Root value={filters.year} onValueChange={(value) => handleFilterChange({ year: value })}>
            <Select.Trigger className="inline-flex items-center justify-between w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <Select.Value placeholder="Any Year" />
              <Select.Icon>
                <ChevronDownIcon className="w-4 h-4" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60">
                <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer">
                  <ChevronUpIcon className="w-4 h-4" />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-1">
                  <SelectItem value="">Any Year</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer">
                  <ChevronDownIcon className="w-4 h-4" />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Minimum Rating
          </label>
          <Select.Root value={filters.rating} onValueChange={(value) => handleFilterChange({ rating: value })}>
            <Select.Trigger className="inline-flex items-center justify-between w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <Select.Value placeholder="Any Rating" />
              <Select.Icon>
                <ChevronDownIcon className="w-4 h-4" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer">
                  <ChevronUpIcon className="w-4 h-4" />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-1">
                  <SelectItem value="">Any Rating</SelectItem>
                  <SelectItem value="9">9+ Stars</SelectItem>
                  <SelectItem value="8">8+ Stars</SelectItem>
                  <SelectItem value="7">7+ Stars</SelectItem>
                  <SelectItem value="6">6+ Stars</SelectItem>
                  <SelectItem value="5">5+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer">
                  <ChevronDownIcon className="w-4 h-4" />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Sort By
          </label>
          <Select.Root value={filters.sortBy} onValueChange={(value) => handleFilterChange({ sortBy: value })}>
            <Select.Trigger className="inline-flex items-center justify-between w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <Select.Value />
              <Select.Icon>
                <ChevronDownIcon className="w-4 h-4" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer">
                  <ChevronUpIcon className="w-4 h-4" />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-1">
                  <SelectItem value="popularity.desc">Most Popular</SelectItem>
                  <SelectItem value="popularity.asc">Least Popular</SelectItem>
                  <SelectItem value="vote_average.desc">Highest Rated</SelectItem>
                  <SelectItem value="vote_average.asc">Lowest Rated</SelectItem>
                  <SelectItem value="release_date.desc">Newest First</SelectItem>
                  <SelectItem value="release_date.asc">Oldest First</SelectItem>
                  <SelectItem value="title.asc">Title A-Z</SelectItem>
                  <SelectItem value="title.desc">Title Z-A</SelectItem>
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer">
                  <ChevronDownIcon className="w-4 h-4" />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
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