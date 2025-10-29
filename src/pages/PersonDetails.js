import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  fetchPersonDetails,
  fetchPersonImages,
  fetchPersonMovieCredits,
  fetchPersonTVCredits,
  getImageUrl
} from '../api/Api';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorPage from '../components/ErrorPage';
import Footer from '../components/Footer';

const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [images, setImages] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTVCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('movies');

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        setLoading(true);
        const [personData, imagesData, movieData, tvData] = await Promise.all([
          fetchPersonDetails(id),
          fetchPersonImages(id),
          fetchPersonMovieCredits(id),
          fetchPersonTVCredits(id)
        ]);

        setPerson(personData);
        setImages(imagesData.profiles || []);
        setMovieCredits(movieData.cast || []);
        setTVCredits(tvData.cast || []);
      } catch (err) {
        console.error('Error fetching person details:', err);
        setError('Failed to load person details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPersonData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="relative bg-white dark:bg-gray-900 min-h-screen p-6">
        <LoadingSkeleton type="detail" />
      </div>
    );
  }

  if (error || !person) {
    return <ErrorPage message={error} onRetry={() => window.location.reload()} />;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  };

  const sortCreditsByPopularity = (credits) => {
    return credits.sort((a, b) => b.popularity - a.popularity);
  };

  const sortedMovieCredits = sortCreditsByPopularity(movieCredits);
  const sortedTVCredits = sortCreditsByPopularity(tvCredits);

  const CreditCard = ({ credit, type }) => (
    <Link
      to={`/${type === 'movie' ? 'movies' : 'tv'}/${credit.id}`}
      className="group"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={getImageUrl(credit.poster_path, 'w300') || '/placeholder.png'}
            alt={credit.title || credit.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
            {credit.title || credit.name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            {credit.character && `as ${credit.character}`}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {new Date(credit.release_date || credit.first_air_date).getFullYear()}
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="relative bg-white dark:bg-gray-900 min-h-screen">
      {/* Header with Profile Image */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <img
                src={getImageUrl(person.profile_path, 'w300') || '/placeholder-person.png'}
                alt={person.name}
                className="w-48 h-72 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{person.name}</h1>
              {person.known_for_department && (
                <p className="text-xl opacity-90 mb-4">{person.known_for_department}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {person.birthday && (
                  <div>
                    <span className="font-medium">Born:</span>
                    <p>{formatDate(person.birthday)}</p>
                  </div>
                )}
                {person.place_of_birth && (
                  <div>
                    <span className="font-medium">Birthplace:</span>
                    <p>{person.place_of_birth}</p>
                  </div>
                )}
                {person.popularity && (
                  <div>
                    <span className="font-medium">Popularity:</span>
                    <p>{person.popularity.toFixed(1)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Biography */}
        {person.biography && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Biography</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {person.biography}
            </p>
          </div>
        )}

        {/* Credits Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('movies')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'movies'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Movies ({movieCredits.length})
              </button>
              <button
                onClick={() => setActiveTab('tv')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tv'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                TV Shows ({tvCredits.length})
              </button>
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === 'movies' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {sortedMovieCredits.slice(0, 30).map((credit) => (
                  <CreditCard key={credit.id} credit={credit} type="movie" />
                ))}
              </div>
            )}

            {activeTab === 'tv' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {sortedTVCredits.slice(0, 30).map((credit) => (
                  <CreditCard key={credit.id} credit={credit} type="tv" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Photo Gallery */}
        {images.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Photos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.slice(0, 20).map((image, index) => (
                <div key={index} className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src={getImageUrl(image.file_path, 'w300')}
                    alt={`${person.name} photo ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PersonDetails;