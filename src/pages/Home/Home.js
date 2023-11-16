import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

// //components
import SearchHome from "../../components/SearchContainer/SearchHome/SearchHome"

// styles
import "./home.css";


 const Home = ({theme}) => {

  

  return (
    <>
    <div className="home-container">
    <div className="home-text">
      Recherchez une entreprise, puis accédez en quelques clics aux conventions collectives et accords d'établissements qui lui sont applicables et répertoriés sur
  <a 
  className="home-link"
  href="https://www.legifrance.gouv.fr/" 
  target="_blank" 
  rel="noopener noreferrer"> Légifrance 
  <span className="icon-link">
  <FontAwesomeIcon
    
    icon={faUpRightFromSquare} 
 
/>

  </span>
   </a>.

</div>
<div className="home-search-engine">
<SearchHome
 theme = {theme}
 />

</div>
  </div>
  </>
      );
    };
    
    export default Home;
