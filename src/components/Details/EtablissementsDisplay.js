import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import PaginationControls from "./PaginationControls";
import EtablissementMap from "../EtablissementMap/EtablissementMap";
import FetchCodesNaf from "../../functions/FetchCodesNaf";
import FetchIdcc from "../../functions/FetchIdcc";

import "./etablissementsDisplay.css";

const EtablissementsDisplay = ({
  selectedDataItem,
  theme,
  currentEtablissements,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const [fetchCodesNafData, setFetchCodesNafData] = useState(null);
  const [idccDataList, setIdccDataList] = useState([]);
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

  return (
    <div className={`etablissements-container${className}`}>
      <p className="etablissements-count">
        {selectedDataItem.nombre_etablissements_ouverts} établissement(s)
      </p>
      <div className={`etablissements-list${className}`}>
        <div className="paginate">
          {currentEtablissements.length > 0 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              theme={theme}
            />
          )}
        </div>

        <div className={`etablissement-cards${className}`}>
          {currentEtablissements.map((etablissement, index) => {
            const idccData = idccDataList[index] || [];

            return (
              <div key={index} className={`etablissement-card${className}`}>
                <div className="left-container">
                  <div className="entreprise-info">
                    <div className="etablissement-header">
                      <h2>{etablissement.est_siege ? "Siège" : "Établissement de"}</h2>
                      <p>{etablissement.libelle_commune}</p>
                    </div>
                    <div className={`etablissement-details${className}`}>
                      <p>{etablissement.adresse.toLowerCase()}</p>
                      <p>{getNafLabel(etablissement.activite_principale)}</p>

                      <a
                        className="legi-link"
                        href={`https://www.legifrance.gouv.fr/liste/acco?siret=${etablissement.siret}&sortValue=DATE_PUBLI_DESC&pageSize=10&page=1&tab_selection=all#acco`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="link-text">accords d'établissement</div>
                        <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" className="link-icon" />
                      </a>

                      <div className="idcc-card-container">
                        {idccData.map((item, idccIndex) => (
                          <div key={idccIndex} className="idcc-card-container">
                            {item.conventions.map((convention, conventionIndex) => (
                              <div key={conventionIndex}>
                                <a href={convention.url} target="_blank" rel="noopener noreferrer">
                                  {convention.shortTitle}
                                </a>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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

                </div>
              </div>
            );
          })}
        </div>

        <div className="paginate">
          {currentEtablissements.length > 0 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              theme={theme}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EtablissementsDisplay;
