import MovieCard from "./MovieCard";

const NewArrival = () => {
  return (
    <div className="absolute top-[1377px] left-[34px] w-[1306px] h-[513px]">
      <div className="absolute top-[0px] left-[66px] flex flex-row items-start justify-start gap-[80px]">
        <MovieCard
          posterImage="/poster-image4@2x.png"
          favorite="/favorite1.svg"
          uSA2016Current="USA, 2021"
          strangerThings="Dune"
          prop="84.0 / 100"
          prop1="75%"
          actionAdventureHorror="Action, Adventure, Drama"
          showTVSeries={false}
        />
        <MovieCard
          posterImage="/poster-image5@2x.png"
          favorite="/favorite1.svg"
          uSA2016Current="USA, 2021"
          strangerThings="No Time To Die"
          prop="76.0 / 100"
          prop1="68%"
          actionAdventureHorror="Action, Adventure, Thriller"
          showTVSeries={false}
        />
        <MovieCard
          posterImage="/poster-image6@2x.png"
          favorite="/favorite1.svg"
          uSA2016Current="USA, 2021"
          strangerThings="Shang-Chi and the Legend of the Ten Rings"
          prop="79.0 / 100"
          prop1="71%"
          actionAdventureHorror="Action, Adventure, Fantasy"
          showTVSeries={false}
        />
        <MovieCard
          posterImage="/poster-image7@2x.png"
          favorite="/favorite1.svg"
          uSA2016Current="USA, 2021"
          strangerThings="Don't Breathe 2"
          prop="61.0 / 100"
          prop1="46%"
          actionAdventureHorror="Action, Drama, Horror "
          showTVSeries={false}
        />
      </div>
      <img
        className="absolute top-[296px] left-[0px] w-12 h-12 overflow-hidden"
        alt=""
        src="/chevron-right1.svg"
      />
    </div>
  );
};

export default NewArrival;
