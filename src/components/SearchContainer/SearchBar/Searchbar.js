import { useState, useEffect } from "react";

//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DataList from "../../DataList/DataList";
import { useData } from "../../../functions/DataContext";

import "./searchbar.css";

const SearchBar = ({ theme }) => {
  const { data, setSearch } = useData();
  // console.log("this data", data[0]);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const className = theme === "bg-dark" ? "-dark" : "-light";

  const handleInputChange = (newValue) => {
    if (newValue) {
      setIsSearching(true);

      // Filtrer les données ici et mettre à jour extractedData en utilisant la newValue (inputValue)
      const filteredData = data[0].filter((item) => {
        const nomComplet = item.nom_complet || "";
        // console.log("nom complet", nomComplet);
        return nomComplet.toLowerCase().includes(newValue.toLowerCase());
      });

      setSearch(newValue); // Mettre à jour la recherche dans votre contexte
      setFilteredData(filteredData.slice(0, 10));
    } else {
      setIsSearching(false);
      setSearch(""); // Remise à zéro de la recherche dans votre contexte
      setFilteredData([]);
    }
  };

  useEffect(() => {
    handleInputChange(inputValue);
  }, [inputValue]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && isSearching) {
      setSearch(inputValue);
      setInputValue("");
    }
  };

  // console.log("this filter search", filteredData.slice(0, 10))
  // console.log("this input", inputValue)

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
                onChange={(e) => {
                  setInputValue(e.target.value);
                  handleInputChange(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
            {/* {inputValue && filteredData && (
              <div className="suggestion-data">
                <DataList
                  theme={theme}
                  // extractedData={filteredData}
                  // onSelect={(selectedItem) => {
                  //   setSearch(selectedItem);
                  //   setInputValue('');
                  // }}
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
