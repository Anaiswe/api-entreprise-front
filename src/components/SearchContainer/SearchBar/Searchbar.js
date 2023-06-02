
//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "./searchbar.css"
import { useState } from "react";

const SearchBar = ({ placeholder, onSearch, value, onChange
 }) => {
  const [prefix, setPrefix] = useState("");
  const [suggestion, setSuggestion] = useState("")

    //const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
      onSearch(value)
      };
      console.log("THIS SEARCH VALUEE", value)

      return (
        <div className="search-bar">
        <input
          id="search-bar"
          type="text"
          placeholder={placeholder}
          value={value}
          autoCapitalize="none"
          onChange={onChange}
        />
        <button onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </button>
        </div>
    );
    };
  
  export default SearchBar;