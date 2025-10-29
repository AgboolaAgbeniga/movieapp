import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import {
  fetchTVShowDetails,
  fetchTVShowCredits,
  fetchTVShowKeywords,
  fetchTVShowRecommendations,
  getImageUrl
} from '../api/Api';
import CastList from '../components/CastList';
import KeywordTags from '../components/KeywordTags';
import Recommendations from '../components/Recommendations';
import LoadingSkeleton from '../components/LoadingSkeleton';
import useGenres from '../hooks/useGenres';
import WatchlistButton from '../components/WatchlistButton';

const TVShowDetails = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getGenreNames } = useGenres('tv');

  useEffect(() => {
    const fetchAllTVData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [details, credits, keywordsData, recommendationsData] = await Promise.all([
          fetchTVShowDetails(id),
          fetchTVShowCredits(id),
          fetchTVShowKeywords(id),
          fetchTVShowRecommendations(id)
        ]);

        setShowDetails(details);
        setCast(credits.cast || []);
        setKeywords(keywordsData.results || []);
        setRecommendations(recommendationsData.results || []);
      } catch (err) {
        console.error('Error fetching TV show details:', err);
        setError('Failed to load TV show details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAllTVData();
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

  if (error || !showDetails) {
    return (
      <>
        <Header />
        <div className="relative bg-gray-900 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-xl">{error || 'TV show not found'}</p>
          </div>
        </div>
      </>
    );
  }

  const genreNames = getGenreNames(showDetails.genres?.map(g => g.id));

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero Section with Full Background */}
      <div
        className="relative min-h-[70vh] bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(${getImageUrl(showDetails.backdrop_path || showDetails.poster_path, 'w1280')})` }}
      >
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl text-white w-full">
            <div className="flex items-center flex-wrap gap-3 mb-4">
              <span className="bg-indigo-600 px-3 py-1 rounded text-sm font-medium">TV SHOW</span>
              {showDetails.first_air_date && (
                <span className="text-lg">{new Date(showDetails.first_air_date).getFullYear()}</span>
              )}
              <span className="flex items-center space-x-1">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">{showDetails.vote_average?.toFixed(1)}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
              {showDetails.name}
            </h1>
            {showDetails.tagline && (
              <p className="text-white/80 text-base sm:text-lg md:text-xl mb-6">{showDetails.tagline}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <WatchlistButton
                item={{
                  id: showDetails.id,
                  type: 'tv',
                  title: showDetails.name,
                  poster_path: showDetails.poster_path,
                  first_air_date: showDetails.first_air_date,
                  vote_average: showDetails.vote_average
                }}
                size="lg"
                showText={true}
              />
              {showDetails.homepage && (
                <a
                  href={showDetails.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
                  aria-label="Visit official show homepage"
                >
                  <span>Official Site</span>
                </a>
              )}
            </div>

            {/* Show Metadata */}
            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 text-sm">
              {showDetails.episode_run_time?.length > 0 && (
                <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 w-full sm:w-auto">
                  <span className="text-gray-300">Runtime:</span>
                  <span className="ml-2 font-medium text-white">{showDetails.episode_run_time[0]} min</span>
                </div>
              )}
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 w-full sm:w-auto">
                <span className="text-gray-300">Seasons:</span>
                <span className="ml-2 font-medium text-white">{showDetails.number_of_seasons}</span>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 w-full sm:w-auto">
                <span className="text-gray-300">Episodes:</span>
                <span className="ml-2 font-medium text-white">{showDetails.number_of_episodes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <main className="relative z-10 bg-gray-900 pt-16" role="main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 lg:space-y-12">
              {/* Overview and Genres */}
              <section aria-labelledby="overview-heading" className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl">
                <h2 id="overview-heading" className="text-2xl font-bold text-white mb-6">Overview</h2>
                {genreNames.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {genreNames.map((genre, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-200 rounded-full text-xs font-medium">
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-gray-200 leading-relaxed">{showDetails.overview}</p>
                <div className="mt-6">
                  <KeywordTags keywords={keywords} />
                </div>
              </section>

              {/* Cast */}
              <section aria-labelledby="cast-heading" className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl">
                <h2 id="cast-heading" className="text-2xl font-bold text-white mb-6">Cast</h2>
                <CastList cast={cast} maxItems={12} />
              </section>

              {/* Recommendations */}
              <section aria-labelledby="recs-heading" className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl">
                <h2 id="recs-heading" className="text-2xl font-bold text-white mb-6">Recommendations</h2>
                <Recommendations recommendations={recommendations} type="tv" maxItems={8} />
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1" aria-label="Show facts">
              <div className="space-y-8">
                {/* Poster Card */}
                <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
                  <img
                    src={getImageUrl(showDetails.poster_path, 'w500') || '/placeholder.png'}
                    alt={showDetails.name}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Facts */}
                <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
                  <h3 className="text-lg font-semibold text-white mb-6">Show Facts</h3>
                  <div className="space-y-5 text-sm">
                    <div className="flex justify-between items-center py-3 px-4 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-400 font-medium">Status:</span>
                      <span className="text-white bg-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
                        {showDetails.status || 'Ongoing'}
                      </span>
                    </div>
                    {showDetails.languages?.length > 0 && (
                      <div className="flex justify-between items-center py-3 px-4 bg-gray-700/50 rounded-lg">
                        <span className="text-gray-400 font-medium">Languages:</span>
                        <span className="text-white font-semibold">{showDetails.languages.join(', ').toUpperCase()}</span>
                      </div>
                    )}
                    {showDetails.networks?.length > 0 && (
                      <div className="flex justify-between items-center py-3 px-4 bg-gray-700/50 rounded-lg">
                        <span className="text-gray-400 font-medium">Network:</span>
                        <span className="text-white font-semibold">{showDetails.networks[0].name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TVShowDetails;