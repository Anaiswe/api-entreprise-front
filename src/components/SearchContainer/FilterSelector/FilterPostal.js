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
        console.log("Valeurs des codes postaux :", fetchedCodes);
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
      const doesStartWith = codePostalValue.startsWith(inputPostalValue);
      console.log("Filtering ", codePostalValue, " with ", inputPostalValue, " Result: ", doesStartWith);
      return doesStartWith;
    })
  : [];


const handlePostalClick = (codePostal) => {
  console.log("Code postal cliqué :", codePostal);
  if (codePostal && codePostal.Code_postal) {
    setInputPostalValue(codePostal.Code_postal.toString());
    setIsPostalDropdownOpen(false);
    setPostalCode(codePostal.Code_postal.toString());
  }
};


  return (
    <div className={`filter-selector${className}`}>
      <input
        className="input-filter"
        placeholder="Code postal"
        value={inputPostalValue}
        onChange={(e) => handleInputChange(e)}
      />
      <div className="suggestions-list">
      {isPostalDropdownOpen && (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {filteredPostalCodes.map((codePostal) => (
              <div
                key={codePostal._id}
                className="suggestion"
                onClick={() => handlePostalClick(codePostal)}
              >
                <div>{codePostal.Code_postal}</div>
                <div>{codePostal.Nom_commune}</div>
              </div>
            ))}
          </div>
        )}
   

      </div>
      <div className="btn-filter">
        <span className="icon-filter" onClick={togglePostalDropdown}>
          <div className="caret-icon">
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </span>
      </div>
    </div>
  );
};

export default FilterPostal;
