import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"; 
import EtablissementMap from "../EtablissementMap/EtablissementMap";
import FetchCodesNaf from "../../functions/FetchCodesNaf";
import FetchIdcc from "../../functions/FetchIdcc";
import { trancheEffectifData } from "../../functions/ExportDefinitions";

import "./etablissementsDisplay.css";

const EtablissementsDisplay = ({
  theme,
  currentEtablissements,
}) => {
  const [fetchCodesNafData, setFetchCodesNafData] = useState(null);
  const [idccDataList, setIdccDataList] = useState([]);
  const [showDetails, setShowDetails] = useState(Array(currentEtablissements.length).fill(false));

  const className = theme === "bg-dark" ? "-dark" : "-light";

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

  useEffect(() => {
    const fetchAllIdccData = async () => {
      const idccDataArray = await Promise.all(
        currentEtablissements.map((etablissement) => FetchIdcc(etablissement.siret))
      );

      setIdccDataList(idccDataArray);
    };

    fetchAllIdccData();
  }, [currentEtablissements]);

  const toggleDetails = (index) => {
    const newShowDetails = [...showDetails];
    newShowDetails[index] = !newShowDetails[index];
    setShowDetails(newShowDetails);
  };

  return (
    <div className={`etablissements-container${className}`}>
    <div className="etablissements-title">
      Etablissements répértoriés
    </div>
      <div className="etablissements-list">
        <div className="etablissements-scroll">
          <div className="etablissement-cards">
            {currentEtablissements.map((etablissement, index) => {
              const idccData = idccDataList[index] || [];

              return (
                <div key={index} className={`etablissement-card${className}`}>

                  <div className="etablissement-header">
                        <h2>{etablissement.est_siege ? "Siège" : "Établissement de"}</h2>
                        <p>{etablissement.libelle_commune}</p>
                      </div>
                  <div className="left-container">
                    <div className="entreprise-info">
                      <div
                        className="see-more"
                        onClick={() => toggleDetails(index)}
                      >
                        Afficher plus
                      </div>
                      {showDetails[index] && (
                        <div className={`etablissement-details${className}`}>
                          <div className="right-container">
                            <div className="map-container">
                              <div className="map">
                                <EtablissementMap
                                  latitude={etablissement.latitude}
                                  longitude={etablissement.longitude}
                                  address={etablissement.adresse}
                                />
                              </div>
                            </div>
                            <p>{etablissement.adresse.toLowerCase()}</p>
                            <p>{getNafLabel(etablissement.activite_principale)}</p>
                            {etablissement.tranche_effectif_salarie !== null &&
                            etablissement.tranche_effectif_salarie !== undefined && (
                              <p>{trancheEffectifData[etablissement.tranche_effectif_salarie]}</p>
                            )}
                            <a
                              className="legi-link"
                              href={`https://www.legifrance.gouv.fr/liste/acco?siret=${etablissement.siret}&sortValue=DATE_PUBLI_DESC&pageSize=10&page=1&tab_selection=all#acco`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="link-text">
                                Consulter les accords d'établissement
                              </div>
                              <FontAwesomeIcon
                                icon={faUpRightFromSquare}
                                size="xs"
                                className="link-icon"
                              />
                            </a>
                            <div className="idcc-card-container">
                              {idccData.map((item, idccIndex) => (
                                <div key={idccIndex} className="idcc-card-container">
                                  {item.conventions.map((convention, conventionIndex) => (
                                    <div key={conventionIndex}>
                                      <a
                                        href={convention.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="idcc-legi-link"
                                      >
                                        {convention.shortTitle}
                                        <FontAwesomeIcon
                                          icon={faUpRightFromSquare}
                                          size="xs"
                                          className="link-icon"
                                        />
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EtablissementsDisplay;
