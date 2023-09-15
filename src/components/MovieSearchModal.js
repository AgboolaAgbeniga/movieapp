import React from 'react';
import Modal from 'react-modal';
import MovieCardResult from './MovieCardResult';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root'); // Set the root element for accessibility

const MovieSearchModal = ({ isOpen, onRequestClose, searchResults, isLoading }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Movie Search Results"
    >
      {/* Display loading indicator while isLoading is true */}
      {isLoading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {searchResults.map((movie) => (
            <Link to={`/movies/${movie.id}`}>
              <MovieCardResult
                key={movie.id}
                title={movie.title}
                posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                releaseDate={movie.release_date}
              />
            </Link>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default MovieSearchModal;
