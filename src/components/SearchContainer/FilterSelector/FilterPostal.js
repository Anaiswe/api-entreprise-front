// Import des dépendances
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../../functions/DataContext";
import FetchPostalCode from "../../../functions/FetchPostalCode";
import "./filterSelector.css";

const FilterPostal = ({  theme }) => {

  const [inputPostalValue, setInputPostalValue] = useState("");
  const [isPostalDropdownOpen, setIsPostalDropdownOpen] = useState(false);
  const [codesPostaux, setCodesPostaux] = useState([]);

  const className = theme === "bg-dark" ? "-dark" : "-light";


  const { departement, setPostalCode } = useData();


  const togglePostalDropdown = () => {
    setIsPostalDropdownOpen(!isPostalDropdownOpen);
  };


  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputPostalValue(value);

    if (value.length === 0) {
      setPostalCode(null);
    }

    if (value.length >= 1) {
      setIsPostalDropdownOpen(true);
    } else {
      setIsPostalDropdownOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCodes = await FetchPostalCode(departement);
        setCodesPostaux(fetchedCodes);
      } catch (error) {
        console.error("Erreur lors de la récupération des codes postaux :", error);
      }
    };
    fetchData();
  }, [departement]);


const filteredPostalCodes = codesPostaux
  ? codesPostaux.filter((codePostal) => {
      const codePostalValue = codePostal.Code_postal.toString();
      const nomCommuneValue = codePostal.Nom_commune.toLowerCase();
      const doesStartWith = codePostalValue.startsWith(inputPostalValue) || nomCommuneValue.startsWith(inputPostalValue);;
      return doesStartWith;
    })
  : [];


const handlePostalClick = (codePostal) => {
  if (codePostal && codePostal.Code_postal) {
    setInputPostalValue(codePostal.Code_postal.toString());
    setIsPostalDropdownOpen(false);
    setPostalCode(codePostal.Code_postal.toString());
  }
};


  return (
    <div className={`filter-selector${className}`}>
      <div className="filter-container">
        <div className="input-container">
          <div className="filter-wrapper">
        <span className="icon-filter" onClick={togglePostalDropdown}>
            <FontAwesomeIcon icon={faCaretDown} />
        </span>

      <div className="input-container">
      <input
        className={`input-filter${className}`}
        placeholder="Code postal"
        value={inputPostalValue}
        onChange={(e) => handleInputChange(e)}
      />
      </div>
      {/* <div className="suggestions-list"> */}
      {isPostalDropdownOpen && (
          <div className={`suggestion-filters${className}`}>
            <div className={`filter-list-container${className}`}>
            {filteredPostalCodes.map((codePostal) => (
              <div className={`filter-card-container${className}`}>
                <div
                key={codePostal._id}
                className={`filter-card-content${className}`}
                onClick={() => handlePostalClick(codePostal)}
              >
                <div>{codePostal.Code_postal}</div>
                <div>{codePostal.Nom_commune}</div>
              </div>
               </div>
               ))}
               </div>
               </div>
               )}
               </div>
               </div>
               </div>
               </div>
  );
};

export default FilterPostal;
