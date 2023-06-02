//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
            <input
            id="filter-dep"
            type="text"
            placeholder={placeholder}
            value={departementValue}
            autoCapitalize="none"
            onChange={onFilterDepartementChange}
            />
             <button onClick={handleDepartementFilter}>
             <FontAwesomeIcon icon={faMagnifyingGlass}/>
             </button>
              <input
            id="filter-postalCode"
            type="text"
            placeholder={placeholder}
            value={postalCodeValue}
            autoCapitalize="none"
            onChange={onFilterCPChange}
            />
            <button onClick={handlePostalCodeFilter}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
   
        </div>
    );
};

export default FilterSelector;