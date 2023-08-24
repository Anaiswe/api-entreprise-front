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



    return (
<>
            <div className="filter-selector">          
            <input className="input-filter"
      
            />
             <div className="btn-filter"
            >
                <span className="icon-filter">
                <div className="caret-icon">
                <FontAwesomeIcon icon={faCaretDown }/>
                </div>
                </span>
             </div>
             </div>
             <div className="filter-selector">
             <input className="input-filter"

            />
            <div className="btn-filter">
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