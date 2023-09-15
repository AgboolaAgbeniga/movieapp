import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BackDrop = () => {
  const { id } = useParams();
  const [videoKey, setVideoKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the movie videos using the movie ID
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=141ec9bcaff6ece9c873d12a24735d52`)
      .then((response) => response.json())
      .then((data) => {
        // Check if there are any video results
        if (data.results && data.results.length > 0) {
          // Set the video key of the first video in the results
          setVideoKey(data.results[0].key);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
        setIsLoading(false);
      });
  }, [id]);
  // relative h-0 overflow-hidden max-w-full w-full
  return (
    <div className="absolute left-[283px] max-w-full w-full md:w-4/5 aspect-w-16 aspect-h-16 rounded-xl py-[] box-border">
    <div 
    className="self-stretch relative h-[500px]"
    >
      {isLoading ? (
        <div 
        className="absolute top-[26px] left-[53px] w-[62px] h-[62px] object-cover"
        >
          Loading Video...
        </div>
      ) : videoKey ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="Movie Trailer"
          frameBorder="0"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      ) : (
        <div className="absolute top-[26px] left-[53px] w-[62px] h-[62px] object-cover">
          No Trailer Available
        </div>
      )}
      <div className="absolute top-[119px] left-[0px] font-medium [text-shadow:0px_2px_4px_rgba(0,_0,_0,_0.25)]">
        Watch Trailer
      </div>
    </div>
  </div>
  
  );
};

export default BackDrop;

// 141ec9bcaff6ece9c873d12a24735d52