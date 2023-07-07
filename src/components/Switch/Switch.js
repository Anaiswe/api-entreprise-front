import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn, faLightbulb } from "@fortawesome/free-solid-svg-icons";

//Styles
import "./switch.css";

const Switch= ({theme, toggleTheme}) => {

    return (
      <div className="theme-container">
        <div className="theme-selector"
        onClick={toggleTheme}>
        <span className="bulb">
            <FontAwesomeIcon
          icon={faLightbulb}
          size="xl"/> 
          </span>
          <span className="theme-text">
            {theme === "bg-dark" ? "OFF " : "ON "}
          </span>
          <span className="toggle-theme">   <FontAwesomeIcon
            icon={theme === "bg-dark" ? faToggleOff : faToggleOn}
            size="xl"
          />
          </span>
          </div>
      </div>
    );
  };
  
  export default Switch;
