import React, { useEffect } from 'react';
import MovieCard from './MovieCard'; // Import MovieCard component
import { useMovieContext } from '../api/MovieContext';
import { Link } from 'react-router-dom';

const FeaturedMovie = () => {
  const movieData = useMovieContext(); // Access movie data from the context

  // Use useEffect to log the API data when it changes
  useEffect(() => {
    console.log('Movie Data:', movieData);
  }, [movieData]);

  return (
    <div className="absolute top-[670px] left-[34px] w-[1308px] h-[604px] text-left text-17xl text-black font-dm-sans">
      <div className="absolute top-[0px] left-[64px] w-[1244px] flex flex-row items-center justify-between">
        <b className="relative">Featured Movie</b>
        <div className="flex flex-row items-center justify-start gap-[8px] text-lg text-rose-700">
          <div className="relative leading-[24px]">See more</div>
          <img
            className="relative w-5 h-5 overflow-hidden shrink-0"
            alt=""
            src="/chevron-right.svg"
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="absolute top-[91px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {movieData.map((movie) => (
            <Link to={`/movies/${movie.id}`}>
              <MovieCard
                key={movie.id}
                posterImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                favorite="/favorite.svg"
                releaseDate={movie.release_date} // Use releaseDate instead of uSA2016Current
                originalTitle={movie.original_title} // Use originalTitle instead of strangerThings
                rating="86.0 / 100" // Use rating instead of prop
                percentage="97%" // Use percentage instead of prop1
                genre="Action, Adventure, Horror" // Use genre instead of actionAdventureHorror
                isTVSeries={movie.isTVSeries} // Use isTVSeries instead of showTVSeries
              />
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FeaturedMovie;