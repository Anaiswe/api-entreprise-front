import React from "react";
import { Link } from "react-router-dom";

// //components
import SearchHome from "../../components/SearchContainer/SearchHome"

// styles
import "./home.css";


 const Home = ({theme}) => {
  const className = theme === "bg-dark" ? "-dark" : "-light";

  

  return (
    <>
    <div className="home-container">
    <div className="home-text">
  Accédez en quelques clics aux conventions collectives et accords d'établissements applicables à une entreprise, et répertoriés sur
  <a href="https://www.legifrance.gouv.fr/" 
  target="_blank" 
  rel="noopener noreferrer"> Légifrance</a>.
</div>
<div className="recherche-container">
  <div className="input-home">
  <SearchHome
 theme = {theme}
 />
  </div>
  <div className="link-details-search">
  <Link to="/recherche">
  <button className={`btn-home${className}`}>Recherche détaillée</button>
  </Link>
  </div>
</div>
  </div>
  </>
      );
    };
    
    export default Home;
