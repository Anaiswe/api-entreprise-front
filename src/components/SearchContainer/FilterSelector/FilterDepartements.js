//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useData } from "../../../functions/DataContext";
import departmentsdData from "../../../assets/data/departments.json";
//styles
import "./filterSelector.css"

const FilterDepartements = ({  theme }) => {

  const [inputDepValue, setInputDepValue] = useState("");
  const [isDepDropdownOpen, setIsDepDropdownOpen] = useState(false);

  const className = theme === "bg-dark" ? "-dark" : "-light";
  console.log("this THEME", theme)

    const {
        setDepartement,
      } = useData();


  const filteredDepartments = departmentsdData.filter((department) =>
  department.num_dep.startsWith(inputDepValue) ||
  department.dep_name.toLowerCase().includes(inputDepValue.toLowerCase()) ||
  department.region_name.toLowerCase().includes(inputDepValue.toLowerCase())
);

  const toggleDepDropdown = () => {
    setIsDepDropdownOpen(!isDepDropdownOpen);
  };


    const handleDepClick = (department) => {
      setInputDepValue(department.num_dep);
      setIsDepDropdownOpen(false);
      setDepartement(department.num_dep);
    };

    const handleInputChange = (event) => {
      const value = event.target.value;
      setInputDepValue(value);
    
      if (value.length >= 1) {
        setIsDepDropdownOpen(true);
      } else {
        setIsDepDropdownOpen(false);
      }
    };

    return (
<>
<div className={`filter-selector${className}`}>
  <input
    className="input-filter"
    placeholder="département"
    value={inputDepValue}
    onChange={handleInputChange}
    />

<div className="suggestions-list">
{isDepDropdownOpen && (
            <div className="suggestions-list" style={{ maxHeight: '300px', overflowY: 'auto'}}>
              {filteredDepartments.map((department) => (
                <div
                  key={department.num_dep}
                  className="suggestion"
                  onClick={() => handleDepClick(department)}
                  >
                  <div>{department.num_dep}</div>
                  <div>{department.dep_name}</div>
                  <div>{department.region_name}</div>
                </div>
              ))}
            </div>
          )}
</div>

<div className="btn-filter">
  <span className="icon-filter" onClick={toggleDepDropdown}>
     <div className="caret-icon">
      <FontAwesomeIcon icon={faCaretDown }/>
      </div>
      </span>
      </div>
      </div>
       </>
    );
};

export default FilterDepartements;