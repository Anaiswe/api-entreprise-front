//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

//styles
import "./filterSelector.css"

const FilterSelector = ({
    placeholder, 
    onFilterDepartement, 
    onFilterCP, 
    value,
    departementValue,
    postalCodeValue,
    onChange,
    onFilterDepartementChange,
    onFilterCPChange
}) => {

    const handleDepartementFilter = () => {
     onFilterDepartement(value)
    };

    const handlePostalCodeFilter = () => {
        onFilterCP(value)
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleDepartementFilter();
        }
      };
    
      const handleKeyDownCP = (e) => {
        if (e.key === "Enter") {
          handlePostalCodeFilter();
        }
      };


    return (
<>
            <div className="filter-selector">          
            <input className="input-filter"
            id="filter-dep"
            type="text"
            placeholder="filtrer par département (ex: 75)"
            value={departementValue}
            autoCapitalize="none"
            onChange={onFilterDepartementChange}
            onKeyDown={handleKeyDown}
            />
             <div className="btn-filter"
             onClick={handleDepartementFilter}>
                <span className="icon-filter">
                <div className="caret-icon">
                <FontAwesomeIcon icon={faCaretDown }/>
                </div>
                </span>
             </div>
             </div>
             <div className="filter-selector">
             <input className="input-filter"
            id="filter-postalCode"
            type="text"
            placeholder="filtrer par code postal (ex: 75020)"
            value={postalCodeValue}
            autoCapitalize="none"
            onChange={onFilterCPChange}
            onKeyDown={handleKeyDownCP}
            />
            <div className="btn-filter"
            onClick={handlePostalCodeFilter}>
              <span className="icon-filter">
                <div className="caret-icon">
                <FontAwesomeIcon icon={faCaretDown }/>
                </div>
               
                </span>
            </div>
             </div>
             </>
    );
};

export default FilterSelector;