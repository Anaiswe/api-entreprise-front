// DataList.js

import { Link } from "react-router-dom";
import { useData } from "../../functions/DataContext";

import "./dataList.css"

const DataList = ({ theme }) => {
  const MAX_RESULTS_TO_DISPLAY = 25; 
  const { data, setSelectedItem } = useData();
  const className = theme === "bg-dark" ? "-dark" : "-light";

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
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
          <p>{item.siege.activite_principale}</p>
          </div>
          <div className="right-content">
          <p>{item.siege.code_postal} ({item.siege.libelle_commune})</p>
          {/* <p>{item.siege.libelle_commune}</p> */}
            </div>
          </div>
         
        </Link>
      ))}
      </div>

  );
};

export default DataList;
