import { useState, useEffect } from 'react';

const WATCHLIST_KEY = 'moviepedia_watchlist';

const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WATCHLIST_KEY);
      if (saved) {
        setWatchlist(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading watchlist:', error);
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error('Error saving watchlist:', error);
    }
  }, [watchlist]);

  const addToWatchlist = (item) => {
    setWatchlist(prev => {
      // Check if item already exists
      if (prev.some(existing => existing.id === item.id && existing.type === item.type)) {
        return prev;
      }
      return [...prev, { ...item, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWatchlist = (id, type) => {
    setWatchlist(prev => prev.filter(item => !(item.id === id && item.type === type)));
  };

  const isInWatchlist = (id, type) => {
    return watchlist.some(item => item.id === id && item.type === type);
  };

  const toggleWatchlist = (item) => {
    if (isInWatchlist(item.id, item.type)) {
      removeFromWatchlist(item.id, item.type);
    } else {
      addToWatchlist(item);
    }
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  const getWatchlistByType = (type) => {
    return watchlist.filter(item => item.type === type);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
    clearWatchlist,
    getWatchlistByType,
    watchlistCount: watchlist.length
  };
};

export default useWatchlist;