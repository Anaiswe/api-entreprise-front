import React, { useState } from "react"; 
import fetchIdcc from "../../functions/FetchIdcc";


const EtablissementsDisplay = ({
  currentEtablissements,
  selectedEtablissementIndex,
  toggleSelectedEtablissement,
  currentPage,
  totalPages,
  setCurrentPage,
  className,
}) => {

  const [idccData, setIdccData] = useState(null);

  const handleFetchIdcc = async (siret) => {
    const idccData = await fetchIdcc(siret);
    console.log("IDCC Data:", idccData);
    setIdccData(idccData);
};


  return (
    <div className={`etablissements-list${className}`}>
      
      {currentEtablissements.map((etablissement, index) => (
        <div key={index} className={`etablissement-card${className}`}>
          <div className={`etablissement-header${className}`}>
            <button onClick={() => {
              handleFetchIdcc(etablissement.siret);
              toggleSelectedEtablissement(index);

            }
            }
            >
              Fetch IDCC
            </button>
            <h2>{etablissement.est_siege ? "Siège" : "Établissement"}</h2>
            <p>{etablissement.libelle_commune}</p>
            <button
              className={`btn-toggle${className}`}
            onClick={() => {
                handleFetchIdcc(etablissement.siret);
                toggleSelectedEtablissement(index);
  
              }
              }
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
              {etablissement.liste_idcc &&
                etablissement.liste_idcc.length > 0 && (
                  <p>
                    Liste IDCC:{" "}
                  </p>
                )}
                {idccData && idccData[0]?.conventions && idccData[0].conventions.length > 0 && (
                <div>
                  <p>IDCC Data:</p>
                  <p>{idccData[0].conventions[0].title}</p>
                  <p>{idccData[0].conventions[0].shortTitle}</p>
                  <p>{idccData[0].conventions[0].texte_de_base}</p>
                  <p>{idccData[0].conventions[0].url}</p>
                  </div>
                  )}
                  <p>
                    Consulter les accords d'entreprise:{" "}
                    <a
                    href={`https://www.legifrance.gouv.fr/liste/acco?siret=${etablissement.siret}&sortValue=DATE_PUBLI_DESC&pageSize=10&page=1&tab_selection=all#acco`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                      Lien vers les accords d'entreprise
                    </a>
                  </p>
                  </div>
                  )}
                   </div>
                   ))}
          {currentEtablissements.length > 0 && (
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
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      )}
  </div>

  );
};

export default EtablissementsDisplay ;