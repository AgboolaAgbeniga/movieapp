import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorPage from '../components/ErrorPage';
import WatchlistButton from '../components/WatchlistButton';
import Footer from '../components/Footer';
import { discoverTVShows, getImageUrl } from '../api/Api';

const TVShows = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Get initial filters from URL params
  const getInitialFilters = () => {
    const params = Object.fromEntries(searchParams.entries());
    return {
      genres: params.genre ? [params.genre] : [],
      year: params.year || '',
      rating: params.rating || '',
      sortBy: params.sort || 'popularity.desc'
    };
  };

  // Get genre name for page title
  const getGenreNameFromId = (genreId) => {
    const genreMap = {
      '10759': 'Action & Adventure',
      '16': 'Animation',
      '35': 'Comedy',
      '80': 'Crime',
      '99': 'Documentary',
      '18': 'Drama',
      '10751': 'Family',
      '10762': 'Kids',
      '9648': 'Mystery',
      '10763': 'News',
      '10764': 'Reality',
      '10765': 'Sci-Fi & Fantasy',
      '10766': 'Soap',
      '10767': 'Talk',
      '10768': 'War & Politics',
      '37': 'Western'
    };
    return genreMap[genreId] || 'TV Shows';
  };

  const [filters, setFilters] = useState(getInitialFilters());

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          page: currentPage,
          sort_by: filters.sortBy
        };

        if (filters.genres.length > 0) {
          params.with_genres = filters.genres.join(',');
        }

        if (filters.year) {
          params.first_air_date_year = filters.year;
        }

        if (filters.rating) {
          params['vote_average.gte'] = filters.rating;
        }

        const data = await discoverTVShows(params);
        setTvShows(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (err) {
        console.error('Error fetching TV shows:', err);
        setError('Failed to load TV shows. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [filters, currentPage]);

  if (error) {
    return (
      <>
        <Header />
        <ErrorPage message={error} onRetry={() => window.location.reload()} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              {filters.genres.length > 0
                ? `${getGenreNameFromId(filters.genres[0])} TV Shows`
                : 'TV Shows'
              }
            </h1>
            <p className="text-gray-400">
              {filters.genres.length > 0
                ? `Explore the best ${getGenreNameFromId(filters.genres[0]).toLowerCase()} TV series`
                : 'Discover the latest and greatest TV series from around the world'
              }
            </p>
          </div>

          {/* Quick Filters Bar */}
          <div className="bg-gray-800 rounded-lg p-4 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Quick Filters:</span>
                <button
                  onClick={() => handleFiltersChange({ ...filters, sortBy: 'popularity.desc' })}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.sortBy === 'popularity.desc' && !filters.genres.length && !filters.year && !filters.rating
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Popular
                </button>
                <button
                  onClick={() => handleFiltersChange({ ...filters, sortBy: 'first_air_date.desc' })}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.sortBy === 'first_air_date.desc'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Latest
                </button>
                <button
                  onClick={() => handleFiltersChange({ ...filters, sortBy: 'vote_average.desc' })}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.sortBy === 'vote_average.desc'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Top Rated
                </button>
              </div>

              <div className="flex items-center space-x-4">
                {(filters.genres.length > 0 || filters.year || filters.rating || filters.sortBy !== 'popularity.desc') && (
                  <button
                    onClick={clearFilters}
                    className="text-red-400 hover:text-red-300 text-sm font-medium"
                  >
                    Clear All
                  </button>
                )}

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {showFilters ? 'Hide' : 'Show'} Advanced Filters
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Genre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Genre
                    </label>
                    <select
                      value={filters.genres[0] || ''}
                      onChange={(e) => handleFiltersChange({
                        ...filters,
                        genres: e.target.value ? [e.target.value] : []
                      })}
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">All Genres</option>
                      <option value="10759">Action & Adventure</option>
                      <option value="16">Animation</option>
                      <option value="35">Comedy</option>
                      <option value="80">Crime</option>
                      <option value="99">Documentary</option>
                      <option value="18">Drama</option>
                      <option value="10751">Family</option>
                      <option value="10762">Kids</option>
                      <option value="9648">Mystery</option>
                      <option value="10763">News</option>
                      <option value="10764">Reality</option>
                      <option value="10765">Sci-Fi & Fantasy</option>
                      <option value="10766">Soap</option>
                      <option value="10767">Talk</option>
                      <option value="10768">War & Politics</option>
                      <option value="37">Western</option>
                    </select>
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Air Year
                    </label>
                    <select
                      value={filters.year}
                      onChange={(e) => handleFiltersChange({ ...filters, year: e.target.value })}
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Any Year</option>
                      {Array.from({ length: 50 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={year}>{year}</option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Minimum Rating
                    </label>
                    <select
                      value={filters.rating}
                      onChange={(e) => handleFiltersChange({ ...filters, rating: e.target.value })}
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Any Rating</option>
                      <option value="9">9+ Stars</option>
                      <option value="8">8+ Stars</option>
                      <option value="7">7+ Stars</option>
                      <option value="6">6+ Stars</option>
                      <option value="5">5+ Stars</option>
                    </select>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFiltersChange({ ...filters, sortBy: e.target.value })}
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="popularity.desc">Most Popular</option>
                      <option value="popularity.asc">Least Popular</option>
                      <option value="vote_average.desc">Highest Rated</option>
                      <option value="vote_average.asc">Lowest Rated</option>
                      <option value="first_air_date.desc">Newest First</option>
                      <option value="first_air_date.asc">Oldest First</option>
                      <option value="name.asc">Name A-Z</option>
                      <option value="name.desc">Name Z-A</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-400">
              {loading ? 'Loading TV shows...' : `${tvShows.length} TV shows found`}
            </p>
          </div>

          {/* TV Shows Grid */}
          {loading ? (
            <LoadingSkeleton type="card" count={20} />
          ) : tvShows.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
              {tvShows.map((show) => (
                <div key={show.id} className="group relative">
                  <Link to={`/tv/${show.id}`} className="block">
                    <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-700 relative">
                      <img
                        src={getImageUrl(show.poster_path, 'w500') || '/placeholder.png'}
                        alt={show.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Rating Badge */}
                      <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{show.vote_average?.toFixed(1)}</span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-red-600 text-white p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* TV Show Info */}
                    <div className="mt-3">
                      <h3 className="font-semibold text-white line-clamp-2 text-sm leading-tight mb-1">
                        {show.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'TBA'}
                      </p>
                    </div>
                  </Link>

                  {/* Watchlist Button */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <WatchlistButton
                      item={{
                        id: show.id,
                        type: 'tv',
                        title: show.name,
                        poster_path: show.poster_path,
                        release_date: show.first_air_date,
                        vote_average: show.vote_average
                      }}
                      size="sm"
                      showText={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-6">
                <svg className="mx-auto h-24 w-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No TV shows found</h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any TV shows matching your current filters.
              </p>
              <button
                onClick={clearFilters}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = Math.max(1, currentPage - 2) + i;
                    if (page > totalPages) return null;

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          page === currentPage
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TVShows;