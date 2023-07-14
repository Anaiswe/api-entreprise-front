import "./toggleSwitch.css"

const ToggleSwitch = () => {
    return (
      <div className="toggle-switch-container">
        IDCC
        <div className="toggle-switch">
        <input type="checkbox" 
        className="toggle-switch-checkbox" 
        name="toggleSwitch" 
        id="toggleSwitch" />
        <label className="toggle-switch-label" for="toggleSwitch">
        <span class="toggle-switch-inner"></span>
      <span class="toggle-switch-switch">
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="rgba(210, 230, 210, 0.8)" 
        class="bi bi-x-circle-fill" 
        viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg>
      </span>
        </label>
        </div>
        <span className="toggle-switch-text">adhére à une convention collective?</span>
        </div>
    );
  };
  
  export default ToggleSwitch;