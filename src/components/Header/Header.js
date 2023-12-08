import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";


import "./header.css";
const Header = ({theme, toggleTheme }) => {
  const navigate = useNavigate();
  const tableClassName = theme === "" || theme === "bg-dark" ? "dark" : "light";

  return (
    <>
    <div className={`header-${tableClassName}`}>
      <FontAwesomeIcon 
      className="home-btn"
         icon={faHouse} 
         size="xl"
         onClick={() => {
          navigate("/")
         }}/>
             <div className="home-text">
      Recherchez une entreprise, puis accédez en quelques clics aux conventions collectives et accords d'entreprise qui lui sont applicables et répertoriés sur
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

         <div className="theme-container">
         <label className="switch">
            <input
              type="checkbox"
              checked={theme === "light"}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
      </div>
         </div>
    </>
  );
}

export default Header;
