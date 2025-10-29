import { useState, useEffect, useCallback } from 'react';

const useInfiniteScroll = (fetchFunction, initialParams = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const params = { ...initialParams, page };
      const response = await fetchFunction(params);

      if (response.results && response.results.length > 0) {
        setData(prevData => [...prevData, ...response.results]);
        setPage(prevPage => prevPage + 1);

        // Check if there are more pages
        if (page >= response.total_pages) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, initialParams, page, loading, hasMore]);

  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  const refresh = useCallback(() => {
    reset();
    loadMore();
  }, [reset, loadMore]);

  // Initial load
  useEffect(() => {
    loadMore();
  }, []); // Only run once on mount

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    refresh
  };
};

export default useInfiniteScroll;