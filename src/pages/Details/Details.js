import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../functions/DataContext";
// import fetchCodesNaf from "../../functions/FetchNaf";
import { trancheEffectifData, activitePrincipaleData } from "../../functions/ExportDefinitions";


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
      <div>
        <p>Raison sociale: {selectedDataItem.nom_raison_sociale}</p>
        <p>Nom complet: {selectedDataItem.nom_complet}</p>
        <p>Siren: {selectedDataItem.siren}</p>
        <p>Catégorie entreprise: {selectedDataItem.categorie_entreprise}</p>
        <p>Nature juridique: {selectedDataItem.nature_juridique}</p>
        <p>Activité principale: {selectedDataItem.section_activite_principale}</p>
        <p>Nombre d'établissements: {selectedDataItem.nombre_etablissements_ouverts}</p>
        <p>Tranche effectifs: {trancheEffectifData[selectedDataItem.tranche_effectif_salarie]}</p>
        <p>Tranche effectifs: {selectedDataItem.tranche_effectif_salarie}</p>
        <p>Egapro: {selectedDataItem.complements.egapro_renseignee ?
          <a href={`https://egapro.travail.gouv.fr/index-egapro/recherche?query=${selectedDataItem.siren}`} target="_blank" rel="noopener noreferrer">Consulter l'index sur le site du ministère du travail</a> : "NON"}</p>
        <h2>Siège</h2>
        <p>Activité principale : {selectedDataItem.siege.activite_principale}</p>
        <p>Siret: {selectedDataItem.siege.siret}</p>
        <p>Adresse: {selectedDataItem.siege.adresse}</p>
      </div>
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
  <div className={`etablissements-list${className}`}>
    {currentEtablissements.map((etablissement, index) => (
      <div key={index} className={`etablissement-card${className}`}>
        <div className={`etablissement-header${className}`}>
          <h2>{etablissement.est_siege ? "Siège" : "Établissement"}</h2>
          <p>{etablissement.libelle_commune}</p>
          <button
            className={`btn-toggle${className}`}
            onClick={() => toggleSelectedEtablissement(index)}
          >
            {selectedEtablissementIndex === index
              ? "Masquer les détails"
              : "Afficher les détails"}
          </button>
        </div>
        {selectedEtablissementIndex === index && (
  <div className={`etablissement-details${className}`}>
    <p>Activité principale : {etablissement.activite_principale}</p>
    <p>Siret: {etablissement.siret}</p>
    <p>Adresse: {etablissement.adresse}</p>
    {etablissement.liste_idcc && etablissement.liste_idcc.length > 0 && (
      <p>
        Liste IDCC:{" "}
        {etablissement.liste_idcc.map((idcc, idccIndex) => (
          <span key={idccIndex}>
            <a
              href={`https://www.legifrance.gouv.fr/search/kali?tab_selection=kali&searchField=IDCC&query=${idcc}&searchType=ALL&texteBase=TEXTE_BASE&typePagination=DEFAUT&sortValue=PERTINENCE&pageSize=10&page=1&tab_selection=kali#kali`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {idcc}
            </a>
            {idccIndex < etablissement.liste_idcc.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    )}
    {etablissement.est_siege && (
      <p>Tranche effectif : {selectedDataItem.siege.tranche_effectif_salarie}</p>
    )}
  </div>
)}

      </div>
    ))}

    {/* Contrôles de pagination */}
    {allEtablissements.length > itemsPerPage && (
            <div className={`pagination-controls${className}`}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Précédent
              </button>
              <span>
                Page {currentPage} sur {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </div>
          )}
  </div>
  )}

  </div>
);};

export default Details;