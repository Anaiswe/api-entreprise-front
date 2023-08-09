import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import "./dataContainer.css";

const DataContainer = ({ data, theme, search }) => {
  console.log("THIs ça c'est ma search dans dataconontainer", search)
  console.log("THIs ça c'est ma data dans dataconontainer", data)
  const [showEtablissements, setShowEtablissements] = useState({});



  const getMatchingEtablissementsInfo = () => {
    const matchingEtablissementsInfo = {};

    data[0].forEach((etablissement, index) => {
      if (etablissement.matching_etablissements) {
        const matchingEtablissements = etablissement.matching_etablissements.map(
          (matchingEtablissement) => {
            const {
              siret,
              libelle_commune,
              est_siege,
              liste_idcc
            } = matchingEtablissement;
            return { siret, libelle_commune, est_siege, liste_idcc };
          }
        );
        matchingEtablissementsInfo[index] = matchingEtablissements;
      }
    });

    return matchingEtablissementsInfo;
  };

  const matchingEtablissementsInfo = getMatchingEtablissementsInfo();
  const nbOfResults = data[1];
  const className = theme === "bg-dark" ? "-dark" : "-light";

  const toggleEtablissements = (index) => {
    setShowEtablissements((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

    // Get the navigate function from the react-router-dom
    const navigate = useNavigate();

    // Function to navigate to the selected item's page
    const navigateToSelectedItem = (itemId) => {
      navigate(`/Selected/${itemId}`);
    };

  return (
    <div className={`data-container${className}`}>
      <h2>Résultats trouvés : {nbOfResults}</h2>
      <div className={`cards-container${className}`}>
        {data[0]?.map((item, index) => (
          <div className={`card${className}`} key={index}>
            <div className={`card-content${className}`}>
              <h3>{item.nom_raison_sociale}</h3>
              <p>{item.siege.adresse}</p>
              <p>siret :{item.siege.siret}</p>
              <p>siren :{item.siren}</p>
              <p>{item.nom_complet}</p>
              <div className="details-link">
              <span>Accéder aux informations détaillées</span>
              <button
              className={`btn-info${className}`}
              onClick={() => {
                const url = `/Details/${item.siege.siret}`;
                // const url = `/Details/${encodeURIComponent(item.nom_complet)}`;
                // navigate(url);
                window.open(url, "_blank");
                }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                  <button
              className={`btn-info${className}`}
              onClick={() => {
                const url = `/Details/${item.nom_raison_sociale}`;
          
                // const url = `/Details/${encodeURIComponent(item.nom_complet)}`;
                // navigate(url);
                window.open(url, "_blank");
                }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                  <button
                className={`btn-info${className}`}
                onClick={() => {
                  // Changez la route selon vos besoins. Ici, nous naviguons vers "/ItemDetail" suivi de l'index de l'item.
                  navigate(`/Details/${item}`);
                }}
              >
                Voir l'item
              </button>
              <Link
              to={{
                pathname: "/Test",
                state: { selectedItem: item }
              }}
              className={`btn-info${className}`}
              >
                Voir les détails
                </Link>
              {/* <Link to={`/Details/${index}`} className={`btn-info${className}`}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link> */}
              {/* <button
                className={`btn-info${className}`}
                onClick={() => {
                  const url = `/Details/${item.siren}`;
                  window.open(url, "_blank");
                }}
              > 
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button> */}
              
              </div>
           
            </div>
            {matchingEtablissementsInfo[index]?.length > 1 && (
              <>
                <button
                  className={`btn-toggle${className}`}
                  onClick={() => toggleEtablissements(index)}
                >
                  {showEtablissements[index] ? (
                    <>
                      Masquer les Établissements
                      <span className="icon-display">
                        <FontAwesomeIcon icon={faCaretUp} />
                      </span>
                    </>
                  ) : (
                    <>
                      Afficher les Établissements
                      <span className="icon-display">
                        <FontAwesomeIcon icon={faCaretDown} />
                      </span>
                    </>
                  )}
                </button>
                {showEtablissements[index] && (
                  <div className={`etablissements-list${className}`}>
                    <h4>Établissements</h4>
                    {matchingEtablissementsInfo[index]?.map(
                      (matchingEtablissement, i) => (
                        <div key={i}>
                          <div>{matchingEtablissement.libelle_commune}</div>
                          <div>{matchingEtablissement.siret}</div>
                          <div>
                            {matchingEtablissement.est_siege
                              ? "Siège social"
                              : "Non siège social"}
                          </div>
                          <div>
                            {matchingEtablissement.liste_idcc.map((idcc, i) => (
                              <div key={i}>{idcc}</div>
                            ))}
                          </div>
                          <button
                            className={`btn-info${className}`}
                            onClick={() => {
                              const url = `/Details/${matchingEtablissement.siret}`;
                              window.open(url, "_blank");
                            }}
                          >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataContainer;