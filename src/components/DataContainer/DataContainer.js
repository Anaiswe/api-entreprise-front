import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useData } from "../../functions/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import FetchCodesNaf from "../../functions/FetchCodesNaf";
import FetchIdcc from "../../functions/FetchIdcc";
import { trancheEffectifData } from "../../functions/ExportDefinitions";
import Loader from "../Loader/Loader";
import DataMap from "./DataMap/DataMap";

import "./dataContainer.css";

const DataContainer = ({ theme }) => {
  const [fetchCodesNafData, setFetchCodesNafData] = useState(null);
  const [idccData, setIdccData] = useState(null);

  const className = theme === "bg-dark" ? "-dark" : "-light";

  const { data, isLoading, setSelectedItem } = useData();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const toggleAdditionalInfo = () => {
      setShowAdditionalInfo(!showAdditionalInfo);
    };



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

  if (isLoading) {
    return <Loader theme={theme} />;
  } else {
    return (
      <div className={`data-container${className}`}>
        <div className={`cards-container${className}`}>
          {data[0]?.map((item) => (
            <div className={`card${className}`} key={item.id}>
              <div className={`card-content${className}`}>
               
                  <Link
                    to={`/Details/${item.id}`}
                    className="card-btn-info"
                    onClick={() => {
                      handleSelectedItem(item);
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                     <div className="card-top"></div>
                    <div className="card-title">
                      {item.nom_complet} ({item.nom_raison_sociale})
                    </div>
                    <div className="more-infos">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                        <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                        <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                      </svg>
                    </div>
                  </Link>
                  <div className="btn-infos-display" onClick={toggleAdditionalInfo}>
                  {showAdditionalInfo ? "Masquer" : "Afficher plus"}
                </div>
                {showAdditionalInfo && (
                <div className="card-content-bottom">
                <div className="map">
                  <DataMap 
                    latitude={item.siege.latitude} 
                    longitude={item.siege.longitude}
                    name={item.nom_complet}
                    address={item.siege.geo_adresse} />
                </div>
                <div className="main-infos">
                  <span>
                    {item.siege.geo_adresse ? item.siege.geo_adresse : item.siege.adresse.toLowerCase()}
                  </span>
                  <span>
                    {getNafLabel(item.activite_principale)}
                  </span>
                  <span>
                    {trancheEffectifData[item.tranche_effectif_salarie]}
                  </span>
                </div>
                <div className="link-container">
                  <div className="link-egapro">
                    {item.complements.egapro_renseignee === true ? (
                      <a href={`https://egapro.travail.gouv.fr/index-egapro/recherche?query=${item.siren}`} target="_blank" rel="noopener noreferrer" className="egapro-url">
                        <div className="link-egapro-item">
                          <div className="text">
                            Index d'égalité professionnelle
                          </div>
                          <div>
                            <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" className="icon" />
                          </div>
                        </div>
                      </a>
                    ) : (
                      null
                    )}
                  </div>

                  {idccData && (
                    <div className="conventions-container"> 
                      {idccData
                        .filter((idccItem) => idccItem.siret === item.siege.siret)
                        .map((matchedIdccItem) => (
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
              )}
             
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default DataContainer;
