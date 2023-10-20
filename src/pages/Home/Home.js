import React from "react";
import { useData } from "../../functions/DataContext";
import { Link } from "react-router-dom";

// //components
import SearchHome from "../../components/SearchContainer/SearchHome"
import DataContainer from "../../components/DataContainer/DataContainer";
import Pagination from "../../components/Pagination/Pagination";
import DataInformations from "../../components/DataInformations/DataInformations";

// styles
import "./home.css";


 const Home = ({theme}) => {

  const {
    data, 
  } = useData();

  const className = theme === "bg-dark" ? "-dark" : "-light";
  

  return (
    <>
    <div className="home-container">
        <SearchHome
        theme = {theme}
     />
      <div className="home-text">
        Entrez un nom, numéro de siret, ou numéro de siren, sélectionnez une entreprise puis cliquer sur "détails" pour afficher les informations et accéder aux textes applicables sur Legifrance.
      </div>
      <Link to="/recherche">
          <button className={`btn-home${className}`}>Recherche détaillée</button>
           </Link>
      </div>
        </>
      );
    };
    
    export default Home;
