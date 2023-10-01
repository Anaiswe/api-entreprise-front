//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
//hooks
import { useData } from "../../../functions/DataContext";


import "./searchbar.css";


const SearchBar = ({  theme }) => {
  const {
    search,
    setSearch,
  } = useData();


  // const [showResults, setShowResults] = useState(false); 
  // const [searchResults, setSearchResults] = useState([]);

  const className = theme === "bg-dark" ? "-dark" : "-light";
  console.log("THEME", theme)


  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
    }
  };

  return (
    <div className={`search-bar${className}`} >
      <input className="input-search"
        id="search-bar"
        type="text"
        placeholder="nom, siret"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <div className="btn-search" >
        <span className="icon-search"
        onChange={handleInputChange}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="l" className="glass-icon" />
        </span>
      </div>
      </div>

  );
};

export default SearchBar;
