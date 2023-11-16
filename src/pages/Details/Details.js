import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../functions/DataContext";
import DetailsHeader from "../../components/Details/DetailsHeader";
import EtablissementsDisplay from "../../components/Details/EtablissementsDisplay";


import "./details.css";

const Details = ({ theme }) => {
  const { id } = useParams(); 
  const { data } = useData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const className = theme === "bg-dark" ? "-dark" : "-light";



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
      <div className={`back-button${className}`}>
        <Link to="/recherche" className="btn-back">
          <span className="icon-back">
            <FontAwesomeIcon icon={faArrowLeft}/>
            </span>
            <button className="btn-back">Retourner à la recherche</button>
        </Link>
      </div>
      
      <div className={`details-data${className}`}>
        <div className="details-header">
          <DetailsHeader selectedDataItem={selectedDataItem} theme={theme} />
          </div>
          
          <EtablissementsDisplay
          currentEtablissements={currentEtablissements}
          selectedDataItem={selectedDataItem}
          theme={theme}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          className={className}
        />
        </div>
      </div>
);};

export default Details;