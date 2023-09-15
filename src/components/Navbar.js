import Logo from "./Logo";
import React, { useState } from 'react';
import SearchForm from "./SearchBar";
import MovieSearchModal from './MovieSearchModal';


const Navbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearch = async (searchQuery) => {
    // Fetch movie data based on the search query (use your API endpoint)
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=141ec9bcaff6ece9c873d12a24735d52`
    );

    if (response.ok) {
      const SearchData = await response.json();
      console.log(SearchData)
      setSearchResults(SearchData.results);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="absolute top-[0px] left-[0px] w-[1440px] h-20 text-left text-base text-white font-dm-sans">
      <div className="absolute top-[0px] left-[0px] w-[1440px] h-20" />
      <SearchForm onSubmit={handleSearch} />
      <MovieSearchModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        searchResults={searchResults}
      />
      <div className="absolute top-[22px] left-[1228px] flex flex-row items-center justify-start gap-[27px]">
        <b className="relative leading-[24px]">Sign in</b>
        <img className="relative w-9 h-9" alt="" src="/menu.svg" />
      </div>
      <Logo
        logoPosition="absolute"
        logoHeight="unset"
        logoWidth="unset"
        logoTop="15px"
        logoRight="unset"
        logoBottom="unset"
        logoLeft="95px"
        movieBoxColor="#fff"
      />
    </div>
  );
};

export default Navbar;
