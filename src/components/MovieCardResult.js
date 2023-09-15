// MovieCard.js
import React from 'react';

const MovieCardResult = ({ title, posterPath, releaseDate }) => {
    return (
        <div data-testid="" className="flex flex-col items-start justify-start gap-[12px] text-left text-xs text-gray-900 font-dm-sans">
            <div className="relative w-[250px] h-[370px]">
                <img
                    className="absolute top-[0px] left-[0px] w-[250px] h-[370px] object-cover"
                    alt=""
                    data-testid="movie-poster"
                    src={posterPath}
                />
            </div>
            <b data-testid="movie-release-date" className="relative text-gray-400">{releaseDate}</b>
            <b data-testid="movie-title" className="relative text-lg inline-block w-[250px]">
                {title}
            </b>

        </div>
    );
};

export default MovieCardResult;
