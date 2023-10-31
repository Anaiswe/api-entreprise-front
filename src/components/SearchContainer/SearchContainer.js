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
    <>
    <div className={`search-container-${tableClassName}`}>
      <div className="main-search">
      <SearchBar theme={theme} />
      </div>

      <div className="advanced-filters">
      <div className="filters-text">filtres avancés
      </div>
      <div className="button-container">
        <button
        className={`burger-button${isMenuOpen ? " open" : ""}`}
        onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          </button>
          </div>
          <div className="filters">
            {isMenuOpen && <FilterDepartements theme={theme} />}
            {isMenuOpen && <FilterPostal theme={theme} />}
            </div>
            </div>
            </div>
            </>
            );
          };

export default SearchContainer;
