import { useState } from "react";

//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../../functions/DataContext";

import "./searchbar.css";

const SearchBar = ({ theme }) => {
  const { setSearch } = useData();

  const [inputValue, setInputValue] = useState("");

  const className = theme === "bg-dark" ? "-dark" : "-light";

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearch(inputValue);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };



  return (
    <div className={`search-bar${className}`}>
      <div className="search-container">
        <div className="input-container">
          <div className="search-wrapper">
            <span className="icon-search">
              <FontAwesomeIcon icon={faSearch} size="xl" className="glass-icon" />
            </span>
            <div className="input-container">
              <input
                className={`input-search${className}`}
                id="search-bar"
                type="text"
                placeholder="nom, siret, siren"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
