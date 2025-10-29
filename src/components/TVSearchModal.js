import React, { useState } from 'react';
import Modal from 'react-modal';
import MovieCardResult from './MovieCardResult';
import SearchFilters from './SearchFilters';
import { Link } from 'react-router-dom';
import { discoverTVShows } from '../api/Api';
import LoadingSkeleton from './LoadingSkeleton';

Modal.setAppElement('#root');

const TVSearchModal = ({
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
        params.first_air_date_year = filters.year;
      }

      if (filters.rating) {
        params['vote_average.gte'] = filters.rating;
      }

      if (filters.sortBy) {
        params.sort_by = filters.sortBy;
      }

      const data = await discoverTVShows(params);
      setFilteredResults(data.results || []);
    } catch (error) {
      console.error('Error applying TV filters:', error);
      setFilteredResults([]);
    } finally {
      setIsFiltering(false);
    }
  };

  const displayResults = filteredResults.length > 0 ? filteredResults : searchResults;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="TV Search Results"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              TV Search Results
            </h2>
            <button
              onClick={onRequestClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <SearchFilters
            onFiltersChange={handleFiltersChange}
            type="tv"
          />
        </div>

        <div className="p-4">
          {isLoading || isFiltering ? (
            <LoadingSkeleton type="card" count={8} />
          ) : displayResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayResults.map((show) => (
                <Link
                  key={show.id}
                  to={`/tv/${show.id}`}
                  onClick={onRequestClose}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-4">
                    <div className="aspect-[2/3] overflow-hidden mb-3">
                      <img
                        src={`https://image.tmdb.org/t/p/w300${show.poster_path}` || '/placeholder.png'}
                        alt={show.name}
                        className="w-full h-full object-cover rounded"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-2">
                      {show.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>{new Date(show.first_air_date).getFullYear()}</span>
                      <span>⭐ {show.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {filteredResults.length === 0 && searchResults.length === 0
                  ? 'No results found. Try adjusting your filters.'
                  : 'No TV shows match your current filters.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TVSearchModal;