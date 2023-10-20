import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DataList from "../DataList/DataList"
import { useData } from "../../functions/DataContext";

import "./SearchBar/searchbar.css";

const SearchHome = ({  theme }) => {
  const { data, setSearch } = useData();
  console.log("this data", data[0]);
  const [extractedData, setExtractedData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [shouldExtract, setShouldExtract] = useState(false);

  const className = theme === "bg-dark" ? "-dark" : "-light";

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


  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     setShouldExtract(false);
  //   }
  // };


  
  console.log("SEARCHRESULT", extractedData);

  return (
    <div className={`search-bar${className}`} >
      <div className="search-container">
        <div className="input-container">
          <div className="search-wrapper">
            <span className="icon-search">
          <FontAwesomeIcon icon={faSearch} size="xl" className="glass-icon" />
          </span>
     
        <div className="input-container">
        <input className={`input-search${className}`}
        id="search-bar"
        type="text"
        placeholder="nom, siret, siren"
        value={inputValue}
        onChange={handleInputChange}
      />
      </div>
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
