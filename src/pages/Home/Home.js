import React from "react";
import { useData } from "../../functions/DataContext";

// //components
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import DataContainer from "../../components/DataContainer/DataContainer";
import Pagination from "../../components/Pagination/Pagination";
import DataInformations from "../../components/DataInformations/DataInformations";

// styles
import "./home.css";


 const Home = ({theme}) => {

  const {
    data, 
  } = useData();
  

  return (
    <>
    <div className="home-container">
        <SearchContainer
        theme = {theme}
     />
      <div className="home-text">
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
        </div>
        </>
      );
    };
    
    export default Home;
