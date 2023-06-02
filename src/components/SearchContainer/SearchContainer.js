import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
//import Turnstone from "turnstone";

//datas
//import RegionList from "../../assets/data/departements-region.json"

//Styles
//import styles from "./Turnstone.module.css";
//components
import SearchBar from "./SearchBar/Searchbar"
import FilterSelector from "./FilterSelector/FilterSelector";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

//Styles
import"./searchcontainer.css"


const SearchContainer =({
  onSearch, 
  onFilterDepartement, 
  onFilterCP
}) => {

  const [searchValue, setSearchValue] = useState('');
  const [departementValue, setDepartementValue] = useState ('');
  const [postalCodeValue, setPostalCodeValue] = useState('');
  
  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleDepartementFilter = () => {
    console.log("this on cherche less dep")
    onFilterDepartement(departementValue);
  };

  const handlePostalCodeFilter = () => {
    console.log("this on cherche less CP")
    onFilterCP(postalCodeValue);
  };

  return (
    <div className="searchContainer container-fluid p-3 bg-dark text">
     <SearchBar
        placeholder="Rechercher"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
      />
      <div className="selector">
      <FilterSelector
          placeholder={"filtrer par DEP"}
          onFilterDepartementChange={(e) =>
            setDepartementValue(e.target.value)
          }
          onFilterDepartement={handleDepartementFilter}
          onFilterCPChange={(e) => setPostalCodeValue(e.target.value)}
          onFilterCP={handlePostalCodeFilter}
        />

   </div>
    <ToggleSwitch/>
    </div>
  );
}
export default SearchContainer;

