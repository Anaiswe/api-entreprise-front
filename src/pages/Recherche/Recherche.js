import React from 'react';
import { useData } from "../../functions/DataContext";

// //components
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import DataContainer from "../../components/DataContainer/DataContainer";
import Pagination from "../../components/Pagination/Pagination";
import DataInformations from "../../components/DataInformations/DataInformations";

import "./recherche.css"

const Recherche = ({ theme }) => {

    const {
        data, 
      } = useData();

      const tableClassName = theme === "" || theme === "bg-dark" ? "dark" : "light";

    return (
        <div className={`rech-container-${tableClassName}`}>
          <div className='rech-bar'>
          <SearchContainer
        theme = {theme}
        />
        </div>
       <div className="pagination">
        <Pagination 
        theme={theme}/>
        </div>
        {data && data.length > 0 && 
        (
          <div className="data-informations">
          <DataInformations
          data={data} />
        </div>
        )}
        <div className="table-data">
          <DataContainer 
            theme={theme}/>
        </div>
        <div className="pagination">
          <Pagination
              theme={theme}/>
         </div>
            {/**/}
        </div>
    );
};

export default Recherche;
