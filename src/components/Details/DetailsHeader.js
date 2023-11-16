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

  if (!selectedDataItem || !fetchCodesNafData) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="details-header-container">
      <div className="details-top">
        <div className={`top-header${className}`}>
          <div className="left">
            <p>{selectedDataItem.nom_complet} ({selectedDataItem.nom_raison_sociale})</p>
            <p>{selectedDataItem.siege.geo_adresse}</p>
            <p>{getNafLabel(selectedDataItem.activite_principale)}</p>
            <p>{trancheEffectifData[selectedDataItem.tranche_effectif_salarie]}</p>
          </div>
          <div className="egapro">
            {selectedDataItem.complements.egapro_renseignee ? (
              <div className={`link${className}`}>
                <a href={`https://egapro.travail.gouv.fr/index-egapro/recherche?query=${selectedDataItem.siren}`} target="_blank" rel="noopener noreferrer" className="link-link">
                  <div className="link-items">
                    <div className="link-text">
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
        </div>
        <div className={`bottom-header${className}`}>
          <div className="idcc">
            {idccData && idccData[0]?.conventions && idccData[0].conventions.length > 0 ? (
              <>
                <div className="idcc-text">
                  Conventions collectives applicables
                </div>
                <div className="idcc-map">
                  {idccData[0].conventions.map((convention, index) => (
                    <div key={index} className={`link${className}`}>
                      <a href={convention.url} target="_blank" rel="noopener noreferrer" className="link-link">
                        <div className="link-items">
                          <div className="link-text">{convention.shortTitle}</div>
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
          <p className="etablissements-count">{selectedDataItem.nombre_etablissements_ouverts} établissement(s)</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;