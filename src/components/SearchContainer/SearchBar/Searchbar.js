//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
//hooks
import { useState, useEffect, useRef } from "react";


import "./searchbar.css";


const SearchBar = ({ placeholder, onSearch, value, onChange, data, theme }) => {
  console.log("this data seatcj", data)

  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);


  const className = theme === "bg-dark" ? "-dark" : "-light";
  const searchRef = useRef(null);

  //const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(value);
    setShowRecentSearches(false);
        // Ajouter la recherche actuelle aux recherches récente
    if (value.trim() !== "" && !recentSearches.includes(value)) {
      const updatedRecentSearches = [...recentSearches, value];
      setRecentSearches(updatedRecentSearches);
    }
  };
  //  console.log("THIS SEARCH VALUEE", value)

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Récupérer les recherches récentes du localStorage au chargement du composant
    const storedRecentSearches = localStorage.getItem("recentSearches");
    if (storedRecentSearches) {
      setRecentSearches(JSON.parse(storedRecentSearches));
    }
  }, []);
  
  useEffect(() => {
    // Stocker les recherches récentes dans le localStorage à chaque changement
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);


  return (
    <div className={`search-bar${className}`} ref={searchRef}>
      <input className="input-search"
        id="search-bar"
        type="text"
        placeholder={placeholder}
        value={value}
        autoCapitalize="none"
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowRecentSearches(true)} // Show recent searches
      />
      <div className="btn-search" onClick={handleSearch}>
        <span className="icon-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="l" className="glass-icon" />
        </span>
      </div>
      <div className="search-stored">
      {showRecentSearches && recentSearches.length > 0 && (
        <ul className="recent-searches">
          {recentSearches.map((search, index) => (
            <li
              key={index}
              onClick={() => onSearch(search)}
              className="recent-search-item"
            >
              {search}
            </li>
          ))}
        </ul>
      )}
      </div>


      </div>

  );
};

export default SearchBar;
