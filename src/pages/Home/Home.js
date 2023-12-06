import React from "react";


// //components
import SearchHome from "../../components/SearchContainer/SearchHome/SearchHome"

// styles
import "./home.css";


 const Home = ({theme}) => {

  

  return (
    <>
    <div className="home-container">

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
