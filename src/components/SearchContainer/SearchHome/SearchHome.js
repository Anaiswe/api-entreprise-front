import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DataList from "../../DataList/DataList"
import { useData } from "../../../functions/DataContext";

import "./searchHome.css"

const SearchHome = ({  theme }) => {
  const navigate = useNavigate();
  const { data, setSearch, setDepartement, setPostalCode, setPage } = useData();
  // console.log("this data", data[0]);
  const [extractedData, setExtractedData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [shouldExtract, setShouldExtract] = useState(false);
  const [lastInputValue, setLastInputValue] = useState("");
// état pour stocker la temporisation de recherche
  const [searchTimeout, setSearchTimeout] = useState(null);

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
            if (inputValue === lastInputValue) {
              setExtractedData(filteredData.slice(0, 10));
            }

            // setExtractedData(filteredData.slice(0, 10));
        }
    };

    if (shouldExtract) {
        extractData(inputValue);
        setShouldExtract(false);
    }
}, [shouldExtract, inputValue, lastInputValue, data]);


const handleInputChange = (event) => {
  const newValue = event.target.value;
  setInputValue(newValue);
  setLastInputValue(newValue); 

  // Effacer le délai précédent
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // nouveau délai pour déclencher setSearch après x secondes
  setSearchTimeout(
    setTimeout(() => {
      setSearch(newValue);
      setShouldExtract(true);
    }, 200) 
  );
};

const handleEnterKeyPress = (event) => {
  if (event.key === "Enter") {

    setSearch(inputValue);
    setShouldExtract(true);
    navigate("/recherche");
    event.preventDefault(); 
  }
};



useEffect(() => {
  // Réinitialiser les résultats de recherche si l'entrée change
  setExtractedData([]);
}, [inputValue]);
  
  // console.log("SEARCHRESULT", extractedData);

  return (
      <div className={`home-search-container`}>
        <div className="home-search-bar">
        <div className={`home-input-search${className}`}>
          <span className="input-icon">
            <FontAwesomeIcon icon={faSearch} size="xl" className="glass-icon" />
            </span>
            <input className={`input-text${className}`}
            id="search-bar"
            type="text"
            placeholder="nom, siret, siren"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterKeyPress}
            />
            </div>
            <Link to="/recherche">
              <button className="btn-home">recherche</button>
              </Link>
              </div>
              <div className="suggestion">
                {inputValue && extractedData && (
                <div className={`home-suggestion-data${className}`}>
                  <DataList 
                  theme = {theme}
                  onSelect={(selectedItem) => {
                    setSearch(selectedItem);
                    setInputValue('');
                    setShouldExtract(true)}} />
                    </div>)}
                    </div>
                    </div>
                    );
                  };

export default SearchHome;
