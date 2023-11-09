// DataList.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../functions/DataContext";


import FetchCodesNaf from "../../functions/FetchCodesNaf";

import "./dataList.css"

const DataList = ({ theme }) => {
  const MAX_RESULTS_TO_DISPLAY = 20; 
  const { data, setSelectedItem } = useData();
  const [fetchCodesNafData, setFetchCodesNafData] = useState(null);
  const className = theme === "bg-dark" ? "-dark" : "-light";

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchCodesNaf();
        setFetchCodesNafData(data);
      } catch (error) {
        console.error("Error fetching codes NAF:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const getNafLabel = (id) => {
    if (Array.isArray(fetchCodesNafData)) {
      const foundItem = fetchCodesNafData.find((item) => item.id === id);
      if (foundItem) {
        return foundItem.label;
      }
    }
    return "Non renseigné";
  };

  return (

      <div className={`list-container${className}`} >
      {data[0]?.slice(0, MAX_RESULTS_TO_DISPLAY).map((item, index) => (
        <Link
          to={`/Details/${item.id}`}
          className={`btn-link${className}`}
          onClick={() => handleSelectedItem(item)}
          style={{ textDecoration: "none" }}
        >
          <div className={`list-item${className}`}>
          <div className="left-content">
          <p>{item.nom_complet} ({item.nom_raison_sociale})</p>
          <p className="naf-label">{getNafLabel(item.activite_principale)}</p>
          </div>
          <p className="middle-content"></p>
          <div className="right-content">
          <p>{item.siege.code_postal} ({item.siege.libelle_commune})</p>
          <p className="icon-fiche">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
              <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
              <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
              </svg>
          </p>
            </div>
          </div>
        </Link>
      ))}
      </div>

  );
};

export default DataList;
