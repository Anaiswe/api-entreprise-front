import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useData } from "../../functions/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import FetchCodesNaf from "../../functions/FetchCodesNaf";
import FetchIdcc from "../../functions/FetchIdcc";
import { trancheEffectifData } from "../../functions/ExportDefinitions";
import Loader from "../Loader/Loader";

import "./dataContainer.css";

const DataContainer = ({ theme }) => {
  const [fetchCodesNafData, setFetchCodesNafData] = useState(null);
  const [idccData, setIdccData] = useState(null);

  const className = theme === "bg-dark" ? "-dark" : "-light";

  const { data, isLoading, setSelectedItem } = useData();

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

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

  const fetchIdccData = useCallback(async () => {
    if (data[0] && data[0].length > 0) {
      const idccDataPromises = data[0].map(async (item) => {
        const siret = item.siege.siret;
        const idccData = await FetchIdcc(siret);
        // console.log(`IDCC Result for siret ${siret}:`, idccData);
        return { siret, idccData };
      });

      const idccResults = await Promise.all(idccDataPromises);
      setIdccData(idccResults);
    }
  }, [data]);

  useEffect(() => {
    if (data && data[0]) {
      fetchIdccData();
    }
  }, [data, fetchIdccData]);

  // console.log(idccData);

  if (isLoading) {
    return <Loader theme={theme} />;
  } else {
    return (
      <div className={`data-container${className}`}>
        <div className={`cards-container${className}`}>
          {/* {data[0]?.map((item, index) => (
            <div className={`card${className}`} key={index}> */}
            {data[0]?.map((item) => (
  <div className={`card${className}`} key={item.id}>
              <div className={`card-content${className}`}>
                <div className="card-content-top">
                  <Link 
                  to={`/Details/${item.id}`}
                  style={{ textDecoration: 'none' }}
                  className="name-link">
                    <div className="card-title">{item.nom_complet}</div>
                  </Link>
                <div className="details-link">
                    <Link
                      to={`/Details/${item.id}`}
                      className="btn-info"
                      onClick={() => {
                        console.log(item);
                        handleSelectedItem(item);
                      }}
                      style={{ textDecoration: 'none' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="card-content-bottom">
                  <div className="raison-sociale">
                  {item.nom_raison_sociale}
                  </div>
                      <div className="other-infos">{item.siege.geo_adresse ? item.siege.geo_adresse : item.siege.adresse.toLowerCase()}</div>
                      <div className="other-infos">{getNafLabel(item.activite_principale)}</div>
                      <div className="other-infos">{trancheEffectifData[item.tranche_effectif_salarie]}</div>
                </div>

                <div className="link-container">
                  <div className="link-egapro">
                  { item.complements.egapro_renseignee === true ? (
                    <>
                      <a href={`https://egapro.travail.gouv.fr/index-egapro/recherche?query=${item.siren}`} target="_blank" rel="noopener noreferrer" className="egapro-url">
                        <div className="link-egapro-item">
                          <div className="text">
                          Index d'égalité professionnelle
                          </div>
                          
                        <div >
                          <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" className="icon" />
                        </div>

                        </div>
                      </a>
                    </>
                  ) : (
                    null
                  )}

                  </div>

                  
                  {idccData && (
                    <div className="conventions-container"> 
                        {idccData
                          .filter((idccItem) => idccItem.siret === item.siege.siret)
                          .map((matchedIdccItem) => (
                            // <div key={matchedIdccItem.siret}>
                            <div key={`${item.id}-${matchedIdccItem.siret}`}>
                              {matchedIdccItem.idccData &&
                                matchedIdccItem.idccData.map((convention) => (
                                  <div key={convention.id}>
                                    {convention.conventions && convention.conventions.length > 0 ? (
                                      <>
                                        <div className="idcc-header">
                                          Conventions collectives applicables
                                        </div>
                                        <div className="idcc-map">
                                          {convention.conventions.map((singleConvention) => (
                                            <div key={singleConvention.id}>
                                              <a href={singleConvention.url} target="_blank" rel="noopener noreferrer" className="link-url">
                                                <div className="link">
                                                    <div>{singleConvention.shortTitle}</div>
                                                    <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" className="icon" />
                                                </div>
                                              </a>
                                            </div>
                                          ))}
                                        </div>
                                      </>
                                    ) : (
                                      null
                                    )}
                                  </div>
                                ))}
                            </div>
                          ))}
                    </div>
                  )}
                </div>

              </div>
              <div className="more">
              <Link
                      to={`/Details/${item.id}`}
                      onClick={() => {
                        // console.log(item);
                        handleSelectedItem(item);
                      }}
                   
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                        </svg>
                    </Link> 
                  </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default DataContainer;
