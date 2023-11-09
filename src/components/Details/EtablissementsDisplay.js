import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./etablissementsDisplay.css"


const EtablissementsDisplay = ({
  currentEtablissements,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {

  return (
    <div className="etablissements-container">
      {currentEtablissements.length > 0 && (
      <div className="pagination-controls">
        <div onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}>
              <span className="btn-page">
              <FontAwesomeIcon icon={faArrowLeft}/>
              </span>
              
              </div>
              <span>
                Page {currentPage} sur {totalPages}
                </span>
                <div
                onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                >
                  <span className="btn-page">
                  <FontAwesomeIcon icon={faArrowRight}/>
                  </span>
                  
                  </div>
                  </div>
                  )}
      
          <div className="etablissements-list">
      {currentEtablissements.map((etablissement, index) => (
        <div key={index} className="etablissement-card">
          <div className="etablissement-header">
            <h2>{etablissement.est_siege ? "Siège" : "Établissement"}</h2>
            <p>{etablissement.libelle_commune}</p>
          </div>
            <div className="etablissement-details">
              <p>Siret: {etablissement.siret}</p>
              <p>{etablissement.adresse}</p>
                  <p className="link">
                    Consulter les accords d'entreprise:{" "}
                    <a
                    className="legi-link"
                    href={`https://www.legifrance.gouv.fr/liste/acco?siret=${etablissement.siret}&sortValue=DATE_PUBLI_DESC&pageSize=10&page=1&tab_selection=all#acco`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                     <FontAwesomeIcon icon={faUpRightFromSquare} size="xl" className="icon" />
                    </a>
                  </p>
                  </div>
                   </div>
                   ))}
                   </div>
                   {currentEtablissements.length > 0 && (
      <div className="pagination-controls">
        <div onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}>
              <span className="btn-page">
              <FontAwesomeIcon icon={faArrowLeft}/>
              </span>
              
              </div>
              <span>
                Page {currentPage} sur {totalPages}
                </span>
                <div
                onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                >
                  <span className="btn-page">
                  <FontAwesomeIcon icon={faArrowRight}/>
                  </span>
                  
                  </div>
                  </div>
                  )}
                            </div>
                            );
                          };

export default EtablissementsDisplay ;