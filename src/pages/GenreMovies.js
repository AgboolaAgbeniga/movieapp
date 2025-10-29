import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieSection from '../components/MovieSection';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorPage from '../components/ErrorPage';
import { fetchMoviesByGenre } from '../api/Api';
import useGenres from '../hooks/useGenres';

const GenreMovies = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { getGenreName } = useGenres('movie');
  const genreName = getGenreName(parseInt(id)) || 'Unknown Genre';

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchMoviesByGenre(id, currentPage);
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (err) {
        console.error('Error fetching genre movies:', err);
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGenreMovies();
    }
  }, [id, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <h1 className="text-4xl font-bold text-white mb-2">{genreName} Movies</h1>
            <p className="text-gray-400">
              Explore the best {genreName.toLowerCase()} movies from around the world
            </p>
          </div>

          {/* Movies Grid */}
          {loading ? (
            <LoadingSkeleton type="card" count={20} />
          ) : movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              {movies.map((movie) => (
                <div key={movie.id} className="group relative">
                  <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}` || '/placeholder.png'}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Overlay with rating */}
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                      ⭐ {movie.vote_average?.toFixed(1)}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-red-600 text-white p-3 rounded-full">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="mt-3">
                    <h3 className="font-semibold text-white line-clamp-2 text-sm leading-tight mb-1">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No {genreName.toLowerCase()} movies found.</p>
              <p className="text-gray-500 text-sm mt-2">This genre might not have movies yet.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GenreMovies;