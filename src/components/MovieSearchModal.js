import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import MovieCardResult from './MovieCardResult';
import SearchFilters from './SearchFilters';
import { Link } from 'react-router-dom';
import { discoverMovies } from '../api/Api';
import LoadingSkeleton from './LoadingSkeleton';

const MovieSearchModal = ({
  isOpen,
  onRequestClose,
  searchResults,
  isLoading,
  onSearchWithFilters
}) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleFiltersChange = async (filters) => {
    if (!filters.genres.length && !filters.year && !filters.rating) {
      setFilteredResults([]);
      return;
    }

    setIsFiltering(true);
    try {
      const params = {};

      if (filters.genres.length > 0) {
        params.with_genres = filters.genres.join(',');
      }

      if (filters.year) {
        params.primary_release_year = filters.year;
      }

      if (filters.rating) {
        params['vote_average.gte'] = filters.rating;
      }

      if (filters.sortBy) {
        params.sort_by = filters.sortBy;
      }

      const data = await discoverMovies(params);
      setFilteredResults(data.results || []);
    } catch (error) {
      console.error('Error applying filters:', error);
      setFilteredResults([]);
    } finally {
      setIsFiltering(false);
    }
  };

  const displayResults = filteredResults.length > 0 ? filteredResults : searchResults;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onRequestClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-2xl z-50 overflow-hidden focus:outline-none"
          aria-modal="true"
        >
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                Search Results
              </Dialog.Title>
              <Dialog.Description className="sr-only">
                Search results dialog with filter options and a grid of matching items.
              </Dialog.Description>
              <Dialog.Close asChild>
                <button
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  aria-label="Close"
                >
                  <Cross2Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </Dialog.Close>
            </div>

            {/* Filters */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <SearchFilters
                onFiltersChange={handleFiltersChange}
                type="movie"
              />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6" role="region" aria-label="Search results" tabIndex={-1}>
              {isLoading || isFiltering ? (
                <LoadingSkeleton type="card" count={12} />
              ) : displayResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" role="list">
                  {displayResults.map((item) => {
                    const isTV = item.media_type === 'tv';
                    const title = isTV ? item.name : item.title;
                    const releaseDate = isTV ? item.first_air_date : item.release_date;
                    const linkPath = isTV ? `/tv/${item.id}` : `/movies/${item.id}`;

                    return (
                      <Link
                        key={item.id}
                        to={linkPath}
                        onClick={onRequestClose}
                        className="block transform transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
                        role="listitem"
                        aria-label={`${title}${releaseDate ? `, ${new Date(releaseDate).getFullYear()}` : ''}`}
                      >
                        <MovieCardResult
                          title={title}
                          posterPath={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          releaseDate={releaseDate}
                        />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12" aria-live="polite">
                  <div className="text-center">
                    <svg className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      {filteredResults.length === 0 && searchResults.length === 0
                        ? 'Try searching for a different movie or TV show.'
                        : 'No items match your current filters.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MovieSearchModal;
