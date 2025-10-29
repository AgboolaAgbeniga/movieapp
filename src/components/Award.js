const Award = ({ movieDetails }) => {
  if (!movieDetails) return null;

  const rating = movieDetails.vote_average || 0;
  const voteCount = movieDetails.vote_count || 0;

  // Calculate ranking based on rating (simplified logic)
  const getRanking = (rating) => {
    if (rating >= 8.5) return 'Top 10';
    if (rating >= 8.0) return 'Top 50';
    if (rating >= 7.5) return 'Top 100';
    if (rating >= 7.0) return 'Top 250';
    return 'Popular';
  };

  const ranking = getRanking(rating);

  return (
    <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
            {ranking} Movie
          </div>
          <div className="text-white">
            <div className="text-lg font-bold">{rating.toFixed(1)}/10 Rating</div>
            <div className="text-gray-400 text-sm">{voteCount.toLocaleString()} votes</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-yellow-400 text-sm font-medium">Community Score</div>
            <div className="text-white text-lg font-bold">{Math.round(rating * 10)}%</div>
          </div>
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Rating breakdown */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{rating.toFixed(1)}</div>
          <div className="text-xs text-gray-400">Average</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{voteCount.toLocaleString()}</div>
          <div className="text-xs text-gray-400">Total Votes</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{Math.round(rating * 10)}%</div>
          <div className="text-xs text-gray-400">Score</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{ranking}</div>
          <div className="text-xs text-gray-400">Ranking</div>
        </div>
      </div>
    </div>
  );
};

export default Award;
