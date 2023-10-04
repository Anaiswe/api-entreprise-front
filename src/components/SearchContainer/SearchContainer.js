import { useState } from "react";
import SearchBar from "./SearchBar/Searchbar";
import FilterDepartements from "./FilterSelector/FilterDepartements";
import FilterPostal from "./FilterSelector/FilterPostal";

// Styles
import "./searchcontainer.css";

const SearchContainer = ({ theme }) => {
  const tableClassName = theme === "" || theme === "bg-dark" ? "dark" : "light";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`search-container-${tableClassName}`}>
      <SearchBar theme={theme} />

      <div className="button-container">
        {!isMenuOpen && (
          <div className="advanced-filters">filtres avancés</div>
        )}
        <button
          className={`burger-button${isMenuOpen ? " open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>
      {isMenuOpen && <FilterDepartements theme={theme} />}
      {isMenuOpen && <FilterPostal theme={theme} />}
    </div>
  );
};
export default SearchContainer;
