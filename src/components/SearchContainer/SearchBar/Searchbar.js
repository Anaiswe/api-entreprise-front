//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "./searchbar.css";
import { useState } from "react";

const SearchBar = ({ placeholder, onSearch, value, onChange, data, theme }) => {
  // console.log("this data seatcj",)
  const [suggestions, setSuggestions] = useState([]);


  //const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(value);
  };
  //  console.log("THIS SEARCH VALUEE", value)

   const handleInputChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredSuggestions = data[0]?.filter(
      (item) =>
        item.nom_raison_sociale.toLowerCase().includes(searchValue) ||
        (item.sigle && item.sigle.toLowerCase().includes(searchValue))
    );
    setSuggestions(filteredSuggestions);
    // console.log("this is")
    onChange(e);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion.nom_raison_sociale);
  };


  return (
    <div className="search-bar">
      <input className="input-search"
        id="search-bar"
        type="text"
        placeholder={placeholder}
        value={value}
        autoCapitalize="none"
        onChange={onChange}
      />
<div className="btn-search" onClick={handleSearch}>
        <span className="icon-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion.nom_raison_sociale}
            </li>
          ))}
        </ul>
      )}
      </div>

  );
};

export default SearchBar;
