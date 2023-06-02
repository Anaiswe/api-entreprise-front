import "./toggleSwitch.css"

const ToggleSwitch = () => {
    return (
      <div className="toggle-switch-container">
        <div className="toggle-switch">
        <input type="checkbox" 
        className="toggle-switch-checkbox" 
        name="toggleSwitch" 
        id="toggleSwitch" />
        <label className="toggle-switch-label" for="toggleSwitch">
        
        <span class="toggle-switch-inner"></span>
      <span class="toggle-switch-switch"></span>
        </label>
        </div>
        <span className="toggle-switch-text">adhére à une convention collective?</span>
        </div>
    );
  };
  
  export default ToggleSwitch;