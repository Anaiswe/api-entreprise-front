import React from "react";

// //components
import SearchHome from "../../components/SearchContainer/SearchHome/SearchHome"

// styles
import "./home.css";


 const Home = ({theme}) => {

  

  return (
    <>
    <div className="home-container">
    <div className="home-text">
  Accédez en quelques clics aux conventions collectives et accords d'établissements applicables à une entreprise, et répertoriés sur
  <a href="https://www.legifrance.gouv.fr/" 
  target="_blank" 
  rel="noopener noreferrer"> Légifrance</a>.
</div>
  <SearchHome
 theme = {theme}
 />
  </div>
  </>
      );
    };
    
    export default Home;
