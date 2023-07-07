import { useState } from "react";

//Styles

import SearchBar from "./SearchBar/Searchbar";
import FilterSelector from "./FilterSelector/FilterSelector";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

//Styles
import "./searchcontainer.css";

const SearchContainer = ({ onSearch, onAutosuggest, onFilterDepartement, onFilterCP }) => {
  const [searchValue, setSearchValue] = useState("");
  const [departementValue, setDepartementValue] = useState("");
  const [postalCodeValue, setPostalCodeValue] = useState("");

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

  const handleAutosuggest = (suggestion) => {
    setSearchValue(suggestion);
    onAutosuggest(suggestion);
  };

  return (
    <div className="search-container">
     
      <SearchBar
        placeholder="Rechercher un employeur"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
        onAutosuggest={handleAutosuggest}
      />
        <FilterSelector
          onFilterDepartementChange={(e) => setDepartementValue(e.target.value)}
          onFilterDepartement={handleDepartementFilter}
          onFilterCPChange={(e) => setPostalCodeValue(e.target.value)}
          onFilterCP={handlePostalCodeFilter}
        />
         
      <ToggleSwitch />
    </div>
  );
};
export default SearchContainer;
