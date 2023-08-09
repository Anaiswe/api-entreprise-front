import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

//Styles
import "./switchTheme.css";

const SwitchTheme= ({theme, toggleTheme}) => {

    return (
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
    );
  };
  
  export default SwitchTheme;
