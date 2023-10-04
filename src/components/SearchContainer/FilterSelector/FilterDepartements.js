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
  <div className="filter-container">
    <div className="input-container">
      <div className="filter-wrapper">
        <span className="icon-filter" onClick={toggleDepDropdown}>
      <FontAwesomeIcon icon={faCaretDown }/>
      </span>

      <div className="input-container">
      <input
    className= {`input-filter${className}`}
    placeholder="département"
    value={inputDepValue}
    onChange={handleInputChange}
    />
    </div>
    {isDepDropdownOpen && (
            <div className="suggestion-data">
              <div className={`list-container${className}`}>
              {filteredDepartments.map((department) => (
                <div className={`card-container${className}`}>
                  <div
                  key={department.num_dep}
                  className={`card-content${className}`}
                  onClick={() => handleDepClick(department)}
                  >
                  <div>{department.num_dep}</div>
                  <div>{department.dep_name}</div>
                  <div>{department.region_name}</div>
                </div>
                </div>
                ))}
              </div>
            </div>
          )}
          </div>
      </div>
    </div>
  </div>
       </>
    );
};

export default FilterDepartements;