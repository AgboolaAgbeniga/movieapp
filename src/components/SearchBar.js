// SearchForm.js
import React, { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <div className="absolute top-[20px] left-[491px] rounded-md box-border w-[529px] flex flex-row py-1.5 px-2.5 items-center justify-between border-[2px] border-solid border-gray-300">
    <form onSubmit={handleSearch}>
      <input
        className="[border:none] font-dm-sans text-base bg-[transparent] flex-1 relative tracking-[1px] leading-[24px] text-white text-left"
        type="text"
        placeholder="Search movies by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit"><img
        className="relative w-4 h-4 overflow-hidden shrink-0"
        alt="Search"
        src="/search.svg"
      /></button>
      </form>
    </div>
    
  );
};

export default SearchForm;
