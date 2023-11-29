import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import FetchCodesNaf from "../../functions/FetchCodesNaf";
import FetchIdcc from "../../functions/FetchIdcc";
import { trancheEffectifData } from "../../functions/ExportDefinitions";

import "./detailsHeader.css";

const DetailsHeader = ({ selectedDataItem, theme }) => {
  const [fetchCodesNafData, setFetchCodesNafData] = useState(null);
  const [idccData, setIdccData] = useState(null);
  const className = theme === "bg-dark" ? "-dark" : "-light";

  const fetchIdccForSiege = async (siret) => {
    try {
      const idccData = await FetchIdcc(siret);
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
        const nafData = await FetchCodesNaf();
        setFetchCodesNafData(nafData);
      } catch (error) {
        console.error("Error fetching codes NAF:", error);
      }
    };

    fetchData();
  }, []);

  const getNafLabel = (id) => {
    if (Array.isArray(fetchCodesNafData)) {
      const convertNafData = fetchCodesNafData.find((item) => item.id === id);
      if (convertNafData) {
        return convertNafData.label;
      }
    }
    return "Non renseigné";
  };

  if (!selectedDataItem || !fetchCodesNafData) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={`details-header-container${className}`}>

          <div className="top">
            <div className="main-informations-entreprise">
            <p className="entreprise-title">{selectedDataItem.nom_complet} ({selectedDataItem.nom_raison_sociale})</p>
            <p>{selectedDataItem.siege.geo_adresse}</p>
            <p>{getNafLabel(selectedDataItem.activite_principale)}</p>
            <p>{trancheEffectifData[selectedDataItem.tranche_effectif_salarie]}</p>

            <div className="egapro-link">
            {selectedDataItem.complements.egapro_renseignee ? (
              <div>
                <a href={`https://egapro.travail.gouv.fr/index-egapro/recherche?query=${selectedDataItem.siren}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="egapro-link-link" 
                style={{ textDecoration: 'none' }}>
                  <div className="link-items">
                    <div className="egapro-link-text">
                      Index d'égalité professionnelle
                    </div>
                    <FontAwesomeIcon icon={faUpRightFromSquare} size="xl" className="icon" />
                  </div>
                </a>
              </div>
            ) : (
              <p>Index d'égalité professionnel non renseigné</p>
            )}
          </div>
          <div className="idcc-container">
            {idccData && idccData[0]?.conventions && idccData[0].conventions.length > 0 ? (
              <>
                <div className="idcc-link-text">
                  Conventions collectives applicables
                </div>
                <div className="idcc-link-details">
                  {idccData[0].conventions.map((convention, index) => (
                    <div key={index}>
                      <a href={convention.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="idcc-link" 
                      style={{ textDecoration: 'none' }}>
                        <div className="link-items">
                          <div className="idcc-link-id">{convention.shortTitle}</div>
                          <FontAwesomeIcon icon={faUpRightFromSquare} size="xl" className="icon" />
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>Aucune convention collective répertoriée</p>
            )}
          </div>
          </div>
            </div>

    </div>
  );
};

export default DetailsHeader;