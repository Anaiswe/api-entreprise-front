import { useState } from "react";

//Styles

import SearchBar from "./SearchBar/Searchbar";
// import SearchBarTest from "./SearchBarTest/SearchBarTest"
import FilterSelector from "./FilterSelector/FilterSelector";
// import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

//Styles
import "./searchcontainer.css";

const SearchContainer = ({ onSearch, onFilterDepartement, onFilterCP, data, theme }) => {
  const [searchValue, setSearchValue] = useState("");
  const [departementValue, setDepartementValue] = useState("");
  const [postalCodeValue, setPostalCodeValue] = useState("");

  const tableClassName = theme === "" || theme === "bg-dark" ? "dark" : "light";

  const handleSearch = () => {
    console.log("this target value", searchValue)
    onSearch(searchValue);
  };

  const handleDepartementFilter = () => {
    console.log("this on cherche less dep")
    onFilterDepartement(departementValue);
  };

  const handlePostalCodeFilter = () => {
    onFilterCP(postalCodeValue);
  };


  return (
  <div className={`search-container-${tableClassName}`}>
      <div className={`search-bar-container-${tableClassName}`}>

      {/* <SearchBarTest data={data}/> */}
     
      <SearchBar
        theme = {theme}
        data={data}
        placeholder="Rechercher un employeur"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
      />
      </div>
      <div className={`filter-selector-container-${tableClassName}`}>

      <FilterSelector
          onFilterDepartementChange={(e) => setDepartementValue(e.target.value)}
          onFilterDepartement={handleDepartementFilter}
          onFilterCPChange={(e) => setPostalCodeValue(e.target.value)}
          onFilterCP={handlePostalCodeFilter}
        />
      </div>
      {/* <ToggleSwitch /> */}
    </div>
  );
};
export default SearchContainer;
