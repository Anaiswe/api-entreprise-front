import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";


import FetchCodesNaf from "../../functions/FetchCodesNaf";
import FetchIdcc from "../../functions/FetchIdcc";
import { trancheEffectifData } from "../../functions/ExportDefinitions";

import "./detailsHeader.css"

const DetailsHeader = ({ selectedDataItem, theme }) => {

  // console.log(theme)
  const [fetchCodesNafData, setFetchCodesNafData] = useState(null);
  const [idccData, setIdccData] = useState(null);


 const fetchIdccForSiege = async (siret) => {
  try {
    const idccData = await FetchIdcc(siret);
    console.log("IDCC Data for Siège:", idccData);
    setIdccData(idccData);
  } catch (error) {
    console.error("Error fetching IDCC data for Siège:", error);
  }
};

useEffect(() => {
  if (selectedDataItem && selectedDataItem.siege) {
    fetchIdccForSiege(selectedDataItem.siege.siret);
  }
}, [selectedDataItem]);



useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await FetchCodesNaf();
      setFetchCodesNafData(data);
    } catch (error) {
      console.error("Error fetching codes NAF:", error);
    }
  };

  fetchData();
}, []);

const getNafLabel = (id) => {
  if (Array.isArray(fetchCodesNafData)) {
    const foundItem = fetchCodesNafData.find((item) => item.id === id);
    if (foundItem) {
      return foundItem.label;
    }
  }
  return "Non renseigné";
};



  if (!selectedDataItem|| !fetchCodesNafData) {
    return <div>Chargement...</div>;
  };

    // const getActivitePrincipaleLabel = (codeActivite) => {
    //   return activitePrincipaleData[codeActivite] || "Non renseigné";
    // };

  return (
    <div>
      <p>{selectedDataItem.nom_complet}</p>
        <p>Raison sociale : {selectedDataItem.nom_raison_sociale}</p>
        <p>{selectedDataItem.siege.geo_adresse}</p>
        <p>Siren : {selectedDataItem.siren}</p>
        {/* <p>{getActivitePrincipaleLabel(selectedDataItem.section_activite_principale)}</p> */}
        <p>Naf/APE : {getNafLabel(selectedDataItem.activite_principale)}</p>
        <p>{trancheEffectifData[selectedDataItem.tranche_effectif_salarie]}</p>
        <p className="link"> Index d'égalité professionnelle: {selectedDataItem.complements.egapro_renseignee ?
          <div className="btn-link">
             <a href={`https://egapro.travail.gouv.fr/index-egapro/recherche?query=${selectedDataItem.siren}`} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLink} size="xl" className="icon" />
          </a>
          </div>
          : "non renseigné"}
          </p>
        <p>Conventions collectives applicables:</p>
      {idccData && idccData[0]?.conventions && idccData[0].conventions.length > 0 && (
        <div>
          {idccData[0].conventions.map((convention, index) => (
            <div key={index} className="link">
              <p>{convention.title} ({convention.shortTitle}) 
              <a href={convention.url} target="_blank" rel="noopener noreferrer" className="btn-link">
                    <FontAwesomeIcon icon={faLink} size="xl" className="icon" />
                  </a>
              
              </p>
            </div>
          ))}
        </div>
      )}
      <p>{selectedDataItem.nombre_etablissements_ouverts} établissement(s)</p>

    </div>
  );
};

export default DetailsHeader;