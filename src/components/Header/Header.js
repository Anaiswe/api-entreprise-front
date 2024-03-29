import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";


import "./header.css";
const Header = ({theme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <>
    <div className="header-container">
      <FontAwesomeIcon 
      className="home-btn"
         icon={faHouse} 
         size="s"
         onClick={() => {
          navigate("/")
         }}/>

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
