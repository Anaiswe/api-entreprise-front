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
    search,
    departement,
    page,
    perPage,
    postalCode,
    isIdcc,
    limitMatchingEtablissments

  } = useData();
  

  return (
    <>
    <div className="home-container">
      <div className="home-search">
        <SearchContainer
        theme = {theme}
     />
     </div>
      <div className="home-text">
        <span>PER PAGE : {perPage}</span>
        <span>PAGE : {page}</span>
        <span>SEARCH : {search}</span>
        <span>DEPARTEMENT: {departement}</span>
        <span>POSTALCODE: {postalCode}</span>
        <span>isIdcc : {isIdcc}</span>
        <span>limitMatchingEtablissments : {limitMatchingEtablissments}</span>
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
