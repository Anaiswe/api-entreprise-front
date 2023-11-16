import { useState } from "react";

//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
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

  const performSearch = () => {
    setSearch(inputValue);
  };



  return (
    <div className={`search-bar-container${className}`}>
      <div className={`search-bar${className}`}>
      <span className="icon-search">
              <FontAwesomeIcon icon={faSearch} size="xl" className="glass-icon" />
            </span>
              <input
                className={`input-search${className}`}
                id="search-bar"
                type="text"
                placeholder="nom, siret, siren"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />         
            <span className="icon-enter" onClick={performSearch}>
            <FontAwesomeIcon icon={faArrowTurnDown} rotation={90} />
            </span>

      </div>

          
    </div>
  );
};

export default SearchBar;
