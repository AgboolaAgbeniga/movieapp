import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Fetch movie details using the API endpoint with the movie ID
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=141ec9bcaff6ece9c873d12a24735d52`)
      .then((response) => response.json())
      .then((data) => {
        // Set the movie details data in state
        setMovieDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  if (!movieDetails) {
    // Return a loading indicator while fetching data
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute top-[518px] left-[275px] w-[785.06px] flex flex-col items-center justify-center gap-[20px] text-left text-mini text-firebrick font-poppins">
      <div className="self-stretch relative h-[150px]">
        <div className="absolute top-[0px] left-[0px] text-4xl text-darkslategray-100">
          <span data-testid="movie-title" className="text-xl font-medium">{movieDetails.title}</span>
          <span> • </span>
          <span className="font-medium" data-testid="movie-release-date">{movieDetails.release_date}</span>
          <span> • </span>
                  <span className="font-medium" >{movieDetails.runtime} min</span>
        </div>
        {/* Rest of your JSX */}
        <div className="absolute top-[60px] left-[0px] text-xl text-darkslategray-200">
          <p className="m-0" data-testid="movie-overview">{movieDetails.overview}</p>
        </div>
      </div>
      
    </div>
  );
};

export default Details;
