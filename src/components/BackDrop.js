import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BackDrop = () => {
  const { id } = useParams();
  const [videoKey, setVideoKey] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=141ec9bcaff6ece9c873d12a24735d52`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          // Set the video key of the first trailer from the response
          setVideoKey(data.results[0].key);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching video:', error);
        setLoading(false);
      });
  }, [id]);

  const handlePlayClick = () => {
    // Play the video when the play button is clicked
    const video = document.getElementById('movieTrailer');
    if (video) {
      video.play();
    }
  };

  return (
    <div className="absolute top-[38px] left-[263px] rounded-xl w-[1198px] flex flex-col py-[132px] px-[509px] box-border items-end justify-start bg-[url('/public/frame-56@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-6xl text-gainsboro-100 font-poppins">
      <div className="self-stretch relative h-[157px]">
        <div className="absolute top-[-1px] left-[28px] rounded-[50%] bg-gray-100 shadow-[0px_2px_4px_rgba(0,_0,_0,_0.25)] [backdrop-filter:blur(4px)] box-border w-28 h-28 border-[2px] border-solid border-gainsboro-200" />
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            Loading Video...
          </div>
        ) : videoKey ? (
          <div className="absolute inset-0">
            <video
              id="movieTrailer"
              className="w-full h-full object-cover"
              controls
            >
              <source
                src={`https://www.youtube.com/watch?v=${videoKey}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent border-2 border-white rounded-full p-3 cursor-pointer"
              onClick={handlePlayClick}
            >
              Play
            </button>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
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
