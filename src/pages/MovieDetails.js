import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Details from '../components/Details';
import Footer from '../components/Footer';
import Award from '../components/Award';
import RightBar from '../components/RightBar';
import CastList from '../components/CastList';
import Recommendations from '../components/Recommendations';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorPage from '../components/ErrorPage';
import WatchlistButton from '../components/WatchlistButton';
import { fetchMovieDetails, fetchMovieVideos, fetchMovieCredits, fetchMovieRecommendations, getImageUrl } from '../api/Api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [movieData, videoData, creditsData, recommendationsData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieVideos(id),
          fetchMovieCredits(id),
          fetchMovieRecommendations(id)
        ]);

        setMovieDetails(movieData);
        setCast(creditsData.cast || []);
        setRecommendations(recommendationsData.results || []);

        // Find the first YouTube trailer
        const trailer = videoData.results?.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="pt-16">
          <LoadingSkeleton type="detail" />
        </div>
      </>
    );
  }

  if (error || !movieDetails) {
    return (
      <>
        <Header />
        <ErrorPage message={error} onRetry={() => window.location.reload()} />
      </>
    );
  }

  const heroImage = getImageUrl(movieDetails.backdrop_path, 'original') ||
                   getImageUrl(movieDetails.poster_path, 'w1280') ||
                   '/placeholder.png';

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero Section with Full Background */}
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl text-white w-full">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-red-600 px-3 py-1 rounded text-sm font-medium">MOVIE</span>
              <span className="text-lg">{new Date(movieDetails.release_date).getFullYear()}</span>
              <span className="flex items-center space-x-1">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">{movieDetails.vote_average?.toFixed(1)}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {movieDetails.title}
            </h1>

            {/* Awards and Nominations Info */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-bold">
                Top rated movie #{movieDetails.vote_average?.toFixed(0) || 'N/A'}
              </span>
              <span className="text-white/90 text-lg">
                Awards {movieDetails.vote_count?.toLocaleString() || 0} nominations
              </span>
            </div>

            <p className="text-base sm:text-lg md:text-xl mb-8 line-clamp-3 max-w-xl leading-relaxed">
              {movieDetails.overview}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {trailerKey ? (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Watch Trailer</span>
                </a>
              ) : (
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Watch Movie</span>
                </button>
              )}

              <WatchlistButton
                item={{
                  id: movieDetails.id,
                  type: 'movie',
                  title: movieDetails.title,
                  poster_path: movieDetails.poster_path,
                  release_date: movieDetails.release_date,
                  vote_average: movieDetails.vote_average
                }}
                size="lg"
                showText={true}
              />
            </div>

            {/* Movie Metadata */}
            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 text-sm">
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 w-full sm:w-auto">
                <span className="text-gray-300">Runtime:</span>
                <span className="ml-2 font-medium text-white">{movieDetails.runtime} min</span>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 w-full sm:w-auto">
                <span className="text-gray-300">Release:</span>
                <span className="ml-2 font-medium text-white">
                  {new Date(movieDetails.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 w-full sm:w-auto">
                <span className="text-gray-300">Rating:</span>
                <span className="ml-2 font-medium text-white">{movieDetails.vote_average?.toFixed(1)}/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 bg-gray-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Movie Details Card */}
   

          {/* Two Column Layout for Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content - Takes 2 columns on lg screens and up */}
            <div className="lg:col-span-2 space-y-8 lg:space-y-12">
              {/* Cast Section */}
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl">
                <CastList cast={cast} maxItems={12} />
              </div>

              {/* Recommendations */}
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl">
                <Recommendations recommendations={recommendations} type="movie" maxItems={8} />
              </div>

              {/* Awards Section */}
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Awards & Recognition</h2>
                <Award movieDetails={movieDetails} />
              </div>
            </div>

            {/* Sidebar - Takes 1 column on lg screens and up */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* RightBar */}
                <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl sticky top-8">
                  <RightBar />
                </div>

                {/* Movie Facts Card */}
                <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
                  <h3 className="text-lg font-semibold text-white mb-6">Movie Facts</h3>
                  <div className="space-y-5 text-sm">
                    <div className="flex justify-between items-center py-3 px-4 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-400 font-medium">Status:</span>
                      <span className="text-white bg-red-600 px-3 py-1 rounded-full text-xs font-medium">
                        {movieDetails.status || 'Released'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 px-4 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-400 font-medium">Budget:</span>
                      <span className="text-white font-semibold">
                        {movieDetails.budget ? `$${(movieDetails.budget / 1000000).toFixed(1)}M` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 px-4 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-400 font-medium">Revenue:</span>
                      <span className="text-white font-semibold">
                        {movieDetails.revenue ? `$${(movieDetails.revenue / 1000000).toFixed(1)}M` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 px-4 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-400 font-medium">Language:</span>
                      <span className="text-white bg-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                        {movieDetails.original_language?.toUpperCase() || 'EN'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MovieDetails;