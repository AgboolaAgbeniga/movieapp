import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieSearchModal from './MovieSearchModal';

const Header = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      // Search both movies and TV shows
      const [movieResponse, tvResponse] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=141ec9bcaff6ece9c873d12a24735d52&page=1`
        ),
        fetch(
          `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&api_key=141ec9bcaff6ece9c873d12a24735d52&page=1`
        )
      ]);

      const results = [];

      if (movieResponse.ok) {
        const movieData = await movieResponse.json();
        // Add type indicator to movies
        const moviesWithType = (movieData.results || []).map(movie => ({ ...movie, media_type: 'movie' }));
        results.push(...moviesWithType);
      }

      if (tvResponse.ok) {
        const tvData = await tvResponse.json();
        // Add type indicator to TV shows
        const tvWithType = (tvData.results || []).map(tv => ({ ...tv, media_type: 'tv' }));
        results.push(...tvWithType);
      }

      // Sort by popularity and limit results
      const sortedResults = results
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 20);

      setSearchResults(sortedResults);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white drop-shadow-lg">Moviepedia</div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-red-500 transition-colors font-medium drop-shadow-lg">
                Home
              </Link>
              <Link to="/movies" className="text-white hover:text-red-500 transition-colors drop-shadow-lg">
                Movies
              </Link>
              <Link to="/tv" className="text-white hover:text-red-500 transition-colors drop-shadow-lg">
                TV Shows
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <form onSubmit={handleSubmit} className="relative" role="search" aria-label="Sitewide">
                <input
                  type="text"
                  placeholder="Search movies and TV shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/50 backdrop-blur-sm text-white rounded-full py-2 px-4 pr-10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-black/70 transition-all placeholder-white/70"
                  aria-label="Search movies and TV shows"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button className="md:hidden text-white drop-shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <MovieSearchModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        searchResults={searchResults}
        isLoading={false}
      />
    </>
  );
};

export default Header;
