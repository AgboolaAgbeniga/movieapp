import React, { useEffect, useState } from 'react';
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
      <div className="relative bg-white dark:bg-gray-900 min-h-screen p-6">
        <LoadingSkeleton type="detail" />
      </div>
    );
  }

  if (error || !showDetails) {
    return (
      <div className="relative bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl">{error || 'TV show not found'}</p>
        </div>
      </div>
    );
  }

  const genreNames = getGenreNames(showDetails.genres?.map(g => g.id));

  return (
    <div className="relative bg-white dark:bg-gray-900 min-h-screen">
      {/* Backdrop */}
      {showDetails.backdrop_path && (
        <div className="relative h-96 overflow-hidden">
          <img
            src={getImageUrl(showDetails.backdrop_path, 'w1280')}
            alt={showDetails.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{showDetails.name}</h1>
            <p className="text-lg opacity-90">{showDetails.tagline}</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <img
              src={getImageUrl(showDetails.poster_path, 'w500') || '/placeholder.png'}
              alt={showDetails.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {showDetails.name}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">First Air Date</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(showDetails.first_air_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last Air Date</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {showDetails.last_air_date ? new Date(showDetails.last_air_date).toLocaleDateString() : 'Ongoing'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Seasons</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {showDetails.number_of_seasons}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Episodes</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {showDetails.number_of_episodes}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="flex items-center gap-1">
                  ⭐ {showDetails.vote_average?.toFixed(1)}/10
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  ({showDetails.vote_count?.toLocaleString()} votes)
                </span>
                {showDetails.episode_run_time?.length > 0 && (
                  <span>⏱️ {showDetails.episode_run_time[0]} min per episode</span>
                )}
              </div>

              {genreNames.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {genreNames.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>{showDetails.overview}</p>
              </div>

              <KeywordTags keywords={keywords} />
            </div>

            {/* Cast */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <CastList cast={cast} maxItems={8} />
            </div>

            {/* Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <Recommendations recommendations={recommendations} type="tv" maxItems={6} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TVShowDetails;