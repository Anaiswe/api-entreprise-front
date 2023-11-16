import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import "./header.css";
const Header = ({theme, toggleTheme }) => {
  const navigate = useNavigate();
  const tableClassName = theme === "" || theme === "bg-dark" ? "dark" : "light";

  return (
    <>
    <div className={`header-${tableClassName}`}>
      <FontAwesomeIcon 
      className={`home-btn-${tableClassName}`}
         icon={faHouse} 
         size="xl"
         onClick={() => {
          navigate("/")
         }}/>
         <div className={`home-btn-${tableClassName}`}>
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
         </div>
    </>
  );
}

export default Header;
