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

    // Extracting the siège (headquarters) establishment from the matching etablissements
    const headquarters = selectedDataItem.matching_etablissements.find(
      etablissement => etablissement.est_siege
    );

      // Filtering out the headquarters from the list of etablissements
  const otherEtablissements = selectedDataItem.matching_etablissements.filter(
    etablissement => !etablissement.est_siege
  );



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
      <button className={`btn-toggle${className}`} onClick={toggleEtablissements}>
      {showEtablissements 
        ? "Masquer les établissements affiliés" 
        : "Afficher les établissements affiliés"}
    </button>

    {showEtablissements && (
      <div className={`etablissements-list${className}`}>
        {headquarters ? (
          <div className={`etablissement-card${className}`}>
            <div className={`etablissement-header${className}`}>
            <h2>Siège</h2>
            <p>{headquarters.libelle_commune}</p>
            
              <button
                className={`btn-toggle${className}`}
                onClick={() => toggleSelectedEtablissement(0)}
              >
                {selectedEtablissementIndex === 0 
                  ? "Masquer les détails" 
                  : "Afficher les détails"}
              </button>
            </div>
            {selectedEtablissementIndex === 0 && (
              <div className={`etablissement-details${className}`}>
                
                <p>Activité principale : {headquarters.activite_principale}</p>
                <p>Siret: {headquarters.siret}</p>
                <p>Adresse: {headquarters.adresse}</p>
                {headquarters.liste_idcc && headquarters.liste_idcc.length > 0 && (
                  <p>Liste IDCC: {headquarters.liste_idcc.join(", ")}</p>
                )}
                {selectedDataItem.siege.tranche_effectif_salarie && (
                  <p>Tranche effectifs: {trancheEffectifData[selectedDataItem.tranche_effectif_salarie]}</p>
                  
                )}
              </div>
            )}
          </div>
        ) : <p>Aucun siège identifié pour cet élément de données.</p>}
        
        {otherEtablissements.map((etablissement, index) => (
          <div key={index} className={`etablissement-card${className}`}>
            <div className={`etablissement-header${className}`}>
              <p>Siret: {etablissement.siret}</p>
              <p>Libellé commune: {etablissement.libelle_commune}</p>
              <p>Est siège: Non</p>
              <button
                className={`btn-toggle${className}`}
                onClick={() => toggleSelectedEtablissement(index + 1)}
              >
                {selectedEtablissementIndex === (index + 1) 
                  ? "Masquer les détails" 
                  : "Afficher les détails"}
              </button>
            </div>
            {selectedEtablissementIndex === (index + 1) && (
              <div className={`etablissement-details${className}`}>
                <h2>Établissement</h2>
                <p>Activité principale : {etablissement.activite_principale}</p>
                <p>Siret: {etablissement.siret}</p>
                <p>Adresse: {etablissement.adresse}</p>
                {etablissement.liste_idcc && etablissement.liste_idcc.length > 0 && (
                  <p>Liste IDCC: {etablissement.liste_idcc.join(", ")}</p>
                )}
                {etablissement.tranche_effectif_salarie && (
                  <p>Tranche effectifs: {etablissement.tranche_effectif_salarie}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);};

export default Details;