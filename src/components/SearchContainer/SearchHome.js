import { useState, useEffect } from "react";

//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DataList from "../DataList/DataList"
import { useData } from "../../functions/DataContext";

import "./SearchBar/searchbar.css";

const SearchHome = ({  theme }) => {
  const { data, setSearch, setDepartement, setPostalCode, setPage } = useData();
  console.log("this data", data[0]);
  const [extractedData, setExtractedData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [shouldExtract, setShouldExtract] = useState(false);

  const className = theme === "bg-dark" ? "-dark" : "-light";

  useEffect(() => {
    // Réinitialiser les états lorsque le composant est monté
    setSearch("");
    setDepartement("");
    setPostalCode("");
    setPage(1)
  }, [setSearch, setDepartement, setPostalCode, setPage]);

  useEffect(() => {

    const extractData = (inputValue) => {
        if (data && data[0]) {
            const filteredData = data[0].filter((item) => {
                const nomComplet = item.nom_complet || "";
                const raisonSociale = item.raison_sociale || "";
                const siren = item.siren || "";
                const siegeSiret = item.siege ? item.siege.siret || "" : "";

                return (
                    nomComplet.toLowerCase().includes(inputValue.toLowerCase()) ||
                    raisonSociale.toLowerCase().includes(inputValue.toLowerCase()) ||
                    siren.toLowerCase().includes(inputValue.toLowerCase()) ||
                    siegeSiret.toLowerCase().includes(inputValue.toLowerCase())
                );
            });

            setExtractedData(filteredData.slice(0, 10));
        }
    };

    if (shouldExtract) {
        extractData(inputValue);
        setShouldExtract(false);
    }
}, [shouldExtract, inputValue, data]);

  
  
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    console.log("this new value", newValue)
    setInputValue(newValue);
    setSearch(newValue);
    if(newValue !== inputValue) {
        setShouldExtract(true);
    } else {
        setExtractedData([]);
    }
};

  
  console.log("SEARCHRESULT", extractedData);

  return (
    <div className={`search-bar${className}`} >
      <div className="search-container">
        <div className="input-container">
        <span className="icon-search">
          <FontAwesomeIcon icon={faSearch} size="xl" className="glass-icon" />
          </span>
          <div className="search-engine">
          <input className={`input-search${className}`}
        id="search-bar"
        type="text"
        placeholder="nom, siret, siren"
        value={inputValue}
        onChange={handleInputChange}
      />
            {inputValue && extractedData && (
        <div className="suggestion-data">
          <DataList 
          theme = {theme}
          
          onSelect={(selectedItem) => {
            setSearch(selectedItem);
            setInputValue('');
            setShouldExtract(true);
          
          }} />
          </div>
      )}
      </div>
      </div>
      </div>
      </div>
  );
};

export default SearchHome;
