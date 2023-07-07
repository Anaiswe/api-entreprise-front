//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "./searchbar.css";
import { useState } from "react";

const SearchBar = ({ placeholder, onSearch, value, onChange }) => {
  const [prefix, setPrefix] = useState("");
  const [suggestion, setSuggestion] = useState("");

  //const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(value);
  };
   console.log("THIS SEARCH VALUEE", value)

   const handleAutosuggest = (e) => {
    const searchValue = e.target.value;
    console.log("this autosuggest", searchValue)
    // Faites votre logique d'autosuggestion ici et mettez à jour le state de la suggestion
    // Exemple : fetchSuggestions(searchValue).then((suggestions) => setSuggestion(suggestions));
  };

  const handleAutocomplete = () => {
    // Faites votre logique d'autocomplétion ici en utilisant la suggestion actuelle
    // Exemple : setPrefix(suggestion);
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
        onKeyUp={handleAutosuggest}
        onKeyDown={handleAutocomplete}
      />
      <div className="btn-search" onClick={handleSearch}>
        <span className="icon-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
