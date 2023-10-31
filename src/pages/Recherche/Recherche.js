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


    return (
        <div className='rech-container'>
         
            <SearchContainer
        theme = {theme}
     />
      <div className="rech-text">

      </div>
      <div className="data-informations">
        <DataInformations
        data={data} />
      </div>
       <div className="pagination">
        <Pagination 
        theme={theme}/>
        </div>
        <div className="table-data">
          <DataContainer 
            theme={theme}/>
        </div>
        <div className="pagination">
          <Pagination
              theme={theme}/>
         </div>
            {/* ... autres éléments de la page */}
        </div>
    );
};

export default Recherche;
