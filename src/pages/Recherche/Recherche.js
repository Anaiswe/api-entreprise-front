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
            <h1>Page de Recherche</h1>
            <SearchContainer
        theme = {theme}
     />
      <div className="rech-text">
        Entrez un nom, numéro de siret, ou numéro de siren, cliquer sur le menu déroulant où appuyer sur entrer.
        Sélectionner une entreprise puis cliquer sur "détails" pour afficher les informations et accéder aux textes applicables.
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
