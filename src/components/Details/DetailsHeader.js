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

          {/* <div className="top"> */}
            <div className="main-informations-entreprise">
              <div className="basic-informations-entreprise">
              <p className="entreprise-title">{selectedDataItem.nom_complet} ({selectedDataItem.nom_raison_sociale})</p>
            <p className="entreprise-infos">{selectedDataItem.siege.geo_adresse}</p>
            <p className="entreprise-infos">{getNafLabel(selectedDataItem.activite_principale)}</p>
            <p className="entreprise-infos">{trancheEffectifData[selectedDataItem.tranche_effectif_salarie]}</p>

            <div className="egapro-link">
            {selectedDataItem.complements.egapro_renseignee ? (
              <div>
                <a href={`https://egapro.travail.gouv.fr/index-egapro/recherche?query=${selectedDataItem.siren}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="egapro-link-link" 
                style={{ textDecoration: 'none' }}>
                  <div className="egapro-link-items">
                    <div className="egapro-link-text">
                      Index d'égalité professionnelle
                    </div>
                    <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" className="icon" />
                  </div>
                </a>
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <div className="accords-link-siege">
                      <a
                href={`https://www.legifrance.gouv.fr/liste/acco?siret=${selectedDataItem.siege.siret}&sortValue=DATE_PUBLI_DESC&pageSize=10&page=1&tab_selection=all#acco`}
                target="_blank"
                rel="noopener noreferrer"
                className="accords-link"
              >
                <div className="accords-link-items">
                  <div className="accords-link-text">
                  consulter les accords d'entreprise du siège
                  </div>
                  <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" className="icon" />
                  </div>
                
               
              </a>
          </div>

              </div>

          <div className="idcc-container">
            {idccData && idccData[0]?.conventions && idccData[0].conventions.length > 0 ? (
              <>
                <div className="idcc-link-text">
                  Conventions collectives applicables
                </div>
                <div className="idcc-link-details">
                  {idccData[0].conventions.map((convention, index) => (
                    <div className= "idcc-link-container"
                    key={index}>
                      <a href={convention.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="idcc-link" 
                      style={{ textDecoration: 'none' }}>
                        <div className="link-items">
                          <div className="idcc-link-id">{convention.shortTitle} (IDCC {convention.num})</div>
                          <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" className="icon" />
                        </div>
                      </a>
                      <div className="num-idcc">
                      <a href={`https://code.travail.gouv.fr/convention-collective/${convention.num}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="idcc-link" 
                      style={{ textDecoration: 'none' }}>
                        <div className="link-items">
                          <div className="idcc-link-id">Questions/réponses fréquentes (IDCC {convention.num})</div>
                          <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" className="icon" />
                        </div>
                      </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
             null
            )}

          </div>

          </div>
            {/* </div> */}

    </div>
  );
};

export default DetailsHeader;