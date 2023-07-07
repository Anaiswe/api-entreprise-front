//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

//styles
import "../FilterSelector/filterSelector.css"

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



    return (
        <div className="filter-selector">
            <input className="input-filter"
            id="filter-dep"
            type="text"
            placeholder="département (ex: 75)"
            value={departementValue}
            autoCapitalize="none"
            onChange={onFilterDepartementChange}
            />
             <div className="btn-search"
             onClick={handleDepartementFilter}>
                <span className="icon-search">
                <FontAwesomeIcon icon={faCaretDown}/>
                </span>
            
             </div>
              <input className="input-filter"
            id="filter-postalCode"
            type="text"
            placeholder="code postal (ex: 75020)"
            value={postalCodeValue}
            autoCapitalize="none"
            onChange={onFilterCPChange}
            />
            <div className="btn-search"
            onClick={handlePostalCodeFilter}>
              <span className="icon-search">
                <FontAwesomeIcon icon={faCaretDown }/>
                </span>
            </div>
   
        </div>
    );
};

export default FilterSelector;