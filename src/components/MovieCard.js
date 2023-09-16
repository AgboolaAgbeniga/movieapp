
const MovieCard = ({
  posterImage,
  favorite,
  releaseDate,
  originalTitle,
  rating,
  percentage,
  genre,
  isTVSeries,
}) => {
  return (
    
    <div data-testid="movie-card" className="flex flex-col items-start justify-start gap-[12px] text-left text-xs text-gray-900 font-dm-sans">
      <div className="relative w-[250px] h-[370px]">
        <img
          className="absolute top-[0px] left-[0px] w-[250px] h-[370px] object-cover"
          alt=""
          data-testid="movie-poster"
          src={posterImage}
        />
        <div className="absolute top-[15.58px] left-[16px] w-[218px] h-[29.21px]">
          {isTVSeries && (
            <div className="absolute top-[3.61px] left-[0px] rounded-xl bg-whitesmoke backdrop-blur-sm flex flex-row py-[3px] px-2 items-start justify-start">
              <b className="relative">TV SERIES</b>
            </div>
          )}
          <img
            className="absolute top-[0px] left-[188px] w-[30px] h-[29.21px]"
            alt=""
            src={favorite}
          />
        </div>
      </div>
      <b data-testid="movie-release-date" className="relative text-gray-400">{releaseDate}</b>
      <b data-testid="movie-title" className="relative text-lg inline-block w-[250px]">
        {originalTitle}
      </b>
      <div className="w-[250px] flex flex-row items-start justify-between">
        <div className="flex flex-row items-center justify-start gap-[10px]">
          <img
            className="relative w-[35px] h-[17px] object-cover"
            alt=""
            src="/mv5bmtk3oda4mjc0nf5bml5bcg5nxkftztgwndc1mzq2ote-1@2x.png"
          />
          <div className="relative leading-[12px]">{rating}</div>
        </div>
        <div className="flex flex-row items-center justify-start gap-[10px]">
          <img
            className="relative w-4 h-[17px] object-cover"
            alt=""
            src="/pngitem-1381056-1@2x.png"
          />
          <div className="relative leading-[12px]">{percentage}</div>
        </div>
      </div>
      <b className="relative text-gray-400">{genre}</b>
    </div>
  
  );
};

export default MovieCard;