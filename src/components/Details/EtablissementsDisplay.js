import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import PaginationControls from "./PaginationControls";

import "./etablissementsDisplay.css";

const EtablissementsDisplay = ({
  selectedDataItem,
  theme,
  currentEtablissements,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const className = theme === "bg-dark" ? "-dark" : "-light";

  return (
    <div className={`etablissements-container${className}`}>
      <p className="etablissements-count">{selectedDataItem.nombre_etablissements_ouverts} établissement(s)</p>
      <div className={`etablissements-list${className}`}>
        {currentEtablissements.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            theme={theme}
          />
        )}

        <div className={`etablissement-cards${className}`}>
          {currentEtablissements.map((etablissement, index) => (
            <div key={index} className={`etablissement-card${className}`}>
              <div className="etablissement-header">
                <h2>{etablissement.est_siege ? "Siège" : "Établissement de"}</h2>
                <p>{etablissement.libelle_commune}</p>
              </div>
              <div className={`etablissement-details${className}`}>
                <p>{etablissement.adresse}</p>

                  <a
                    className="legi-link"
                    href={`https://www.legifrance.gouv.fr/liste/acco?siret=${etablissement.siret}&sortValue=DATE_PUBLI_DESC&pageSize=10&page=1&tab_selection=all#acco`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={`link${className}`}>
                      <div className="link-text">
                      Consulter les accords de l'établissement
                      </div>
                      <FontAwesomeIcon icon={faUpRightFromSquare} size="xl" className="icon" />
                    </div>
                    
                  </a>
           
              </div>
            </div>
          ))}
        </div>

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
  );
};

export default EtablissementsDisplay;
