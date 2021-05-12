import { useState, useEffect } from "react";

import "../styles/searchbox.css";

const SearchBox = ({ placeholder = "search here", search, setSearch }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      const writingItv = setTimeout(() => {
        console.log(search);
      }, 450);

      return () => {
        clearTimeout(writingItv);
      };
    }
  }, [search]);

  return (
    <div className="searchbox">
      <input
        placeholder={placeholder}
        type="text"
        value={search}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default SearchBox;
