import SearchBar from "./SearchBar/Searchbar"
import FilterDepartements from "./FilterSelector/FilterDepartements";
import FilterPostal from "./FilterSelector/FilterPostal";

//Styles
import "./searchcontainer.css";

const SearchContainer = ({ theme }) => {

  const tableClassName = theme === "" || theme === "bg-dark" ? "dark" : "light";


  return (
  <div className={`search-container-${tableClassName}`}>
      <SearchBar
        theme = {theme}/>
      <FilterDepartements
         theme = {theme} />
      <FilterPostal
       theme = {theme} />
    </div>
  );
};
export default SearchContainer;
