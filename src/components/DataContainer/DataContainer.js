import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../functions/DataContext";
import Loader from "../Loader/Loader";
import "./dataContainer.css";

const DataContainer = ({ theme }) => {
  const {
    data,
    isLoading,
    setSelectedItem,
    // Ajoutez d'autres variables du contexte si nécessaire
  } = useData();

  console.log("this data", data)

  const [showEtablissements, setShowEtablissements] = useState({});


  const navigate = useNavigate();

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  const getMatchingEtablissementsInfo = () => {
    const matchingEtablissementsInfo = {};

    if (data[0]) { // Vérifier si data[0] est défini
      data[0].forEach((etablissement, index) => {
        if (etablissement.matching_etablissements) {
          const matchingEtablissements = etablissement.matching_etablissements.map(
            (matchingEtablissement) => {
              const { siret, libelle_commune, est_siege, liste_idcc } = matchingEtablissement;
              return { siret, libelle_commune, est_siege, liste_idcc };
            }
          );
          matchingEtablissementsInfo[index] = matchingEtablissements;
        }
      });
    }

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

  if (isLoading) {
    return <Loader theme={theme} />;
  } else {
    return (
      <div className={`data-container${className}`}>
        <p>Résultats trouvés : {nbOfResults}</p>
        
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
                  {/* Utilisez le hook navigate pour la navigation */}
                  <Link
                    to={`/Details/${item.id}`}
                    className={`btn-info${className}`}
                    onClick={() => {
                      console.log("this f**", item);
                      handleSelectedItem(item); // Mettre à jour l'élément sélectionné
                      // navigate(`/Details/${item.id}`); 
                    }}
                    // target="_blank"
                  >
                    Voir les détails
                  </Link>
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
                </div>
                {/* {showEtablissements[index] && (
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
                              const url = `/Details`;
                              window.open(url, "_blank");
                            }}
                          >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  
};

export default DataContainer;
