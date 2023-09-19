import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../functions/DataContext";
// import fetchCodesNaf from "../../functions/FetchNaf";
import fetchIdcc from "../../functions/FetchIdcc";
import DetailsHeader from "../../components/Details/DetailsHeader";
import EtablissementsDisplay from "../../components/Details/EtablissementsDisplay";


import { trancheEffectifData, activitePrincipaleData } from "../../functions/ExportDefinitions";


import "./details.css";

const Details = ({ theme }) => {
  const { id } = useParams(); 
  const { data, idccData, updateIdccData } = useData(); 
  console.log("this idccData", idccData)
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
  } else {
    const storedData = JSON.parse(localStorage.getItem("storedData")) || [];
    selectedDataItem = storedData.find((item) => item.id === Number(id));
  }

  if (!selectedDataItem) {
    return <div>Chargement...</div>;
  };

  console.log("this item", selectedDataItem)

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
  console.log("this currentEtablissements", currentEtablissements)
  const totalPages = Math.ceil(allEtablissements.length / itemsPerPage);
  console.log("this total page", totalPages)
  
  return (
    <div className={`details-container${className}`}>
      <DetailsHeader selectedDataItem={selectedDataItem} />
      <button
      className={`btn-toggle${className}`}
      onClick={toggleEtablissements}
    >
      {showEtablissements ? (
        <>
          Masquer les établissements affiliés
          <span className="icon-display">
            <FontAwesomeIcon icon={faCaretUp} />
          </span>
        </>
      ) : (
        <>
          Afficher les établissements affiliés
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