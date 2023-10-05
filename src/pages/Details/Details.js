import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../functions/DataContext";
import DetailsHeader from "../../components/Details/DetailsHeader";
import EtablissementsDisplay from "../../components/Details/EtablissementsDisplay";


import "./details.css";

const Details = ({ theme }) => {
  const { id } = useParams(); 
  const { data } = useData();
  const [showEtablissements, setShowEtablissements] = useState(false);
  const [selectedEtablissementIndex, setSelectedEtablissementIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const className = theme === "bg-dark" ? "-dark" : "-light";


  const toggleEtablissements = () => {
    setShowEtablissements(!showEtablissements);
  };

  const toggleSelectedEtablissement = (index) => {
    if (selectedEtablissementIndex === index) {
      setSelectedEtablissementIndex(null);
    } else {
      setSelectedEtablissementIndex(index);
    }
  };


  let selectedDataItem;

  if (data && data.length > 0) {
    selectedDataItem = data[0].find((item) => item.id === Number(id));
    
    // Stocker dans le localStorage
    localStorage.setItem("selectedDataItem", JSON.stringify(selectedDataItem));
    
  } else {
    // Essayez d'obtenir l'item du localStorage
    selectedDataItem = JSON.parse(localStorage.getItem("selectedDataItem"));
    
    if (!selectedDataItem || selectedDataItem.id !== Number(id)) {
      const storedData = JSON.parse(localStorage.getItem("storedData")) || [];
      selectedDataItem = storedData.find((item) => item.id === Number(id));
    }
  }
  

  const headquarters = selectedDataItem.matching_etablissements.find(
    (etablissement) => etablissement.est_siege
  );

  const otherEtablissements = selectedDataItem.matching_etablissements.filter(
    (etablissement) => !etablissement.est_siege
  );

  let allEtablissements;

if (headquarters) {
  allEtablissements = [headquarters, ...otherEtablissements];
} else {
  allEtablissements = otherEtablissements;
}
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEtablissements = allEtablissements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allEtablissements.length / itemsPerPage);

  
  return (
    <div className={`details-container${className}`}>
      <div className="details-header">
      <DetailsHeader selectedDataItem={selectedDataItem} theme={theme} />
      </div>
      
      <button
      className={`btn-toggle${className}`}
      onClick={toggleEtablissements}
    >
      {showEtablissements ? (
        <>
          Masquer les établissement
          <span className="icon-display">
            <FontAwesomeIcon icon={faCaretUp} />
          </span>
        </>
      ) : (
        <>
          Afficher les établissements
          <span className="icon-display">
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </>
      )}
    </button>
    {showEtablissements && (
        <EtablissementsDisplay
          currentEtablissements={currentEtablissements}
          selectedEtablissementIndex={selectedEtablissementIndex}
          toggleSelectedEtablissement={toggleSelectedEtablissement}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          className={className}
        />
      )}
      



  </div>
);};

export default Details;