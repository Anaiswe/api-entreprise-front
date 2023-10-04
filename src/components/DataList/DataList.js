import React from "react";
import { useData } from "../../functions/DataContext";

import "./dataList.css"

const DataList = ({ onSelect, theme }) => {

  const className = theme === "bg-dark" ? "-dark" : "-light";

    const {
        data
      } = useData();

  const handleSelect = (item) => {
    onSelect(item.nom_complet);
  };

  return (
    
    <div className= {`list-container${className}`}>
      {data[0]?.map((item, index) => (
        <div className={`card-container${className}`} key={index} onClick={() => handleSelect(item)}>
          <div className= {`card-content${className}`}>
          <p>{item.nom_complet} ({item.nom_raison_sociale})</p>
          <p>{item.siege.libelle_commune} ({item.siege.departement})</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataList;
