// MovieContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchMovieData } from './Api';

const MovieContext = createContext();

export const useMovieContext = () => {
    return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        fetchMovieData().then((data) => {
            setMovieData(data);
        });
    }, []);

    return (
        <MovieContext.Provider value={movieData}>
            {children}
        </MovieContext.Provider>
    );
};
