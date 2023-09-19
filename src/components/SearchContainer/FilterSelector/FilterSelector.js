//pkg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect} from "react";
import { useData } from "../../../functions/DataContext";
import departmentsdData from "../../../assets/data/departments.json";
//styles
import "./filterSelector.css"

const FilterSelector = () => {

  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // const [selectedDepartment, setSelectedDepartment] = useState(null);

    const {
        data, 
        setData, 
        search,
        setSearch,
        departement,
        setDepartement,
        postalCode,
        setPostalCode
        // Ajoutez d'autres variables si nécessaire
      } = useData();

      // const firstDepartment = departmentsData[0];

      console.log("thiss ddata", data[0], departement);
      console.log("thiss deepp", typeof departement)
      console.log("thiss dDHHGXGQa", departmentsdData);



  // Déplacez cette partie à l'intérieur de la fonction du composant
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length >= 2) {
      setDepartement(value);
    } else {
      setDepartement("");
    };

      
        
        const filteredSuggestions = departmentsdData.filter(
            (department) => 
            department.num_dep.startsWith(inputValue)||
            department.dep_name.toLowerCase().includes(inputValue.toLowerCase()) ||
            department.region_name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };



    const handleSuggestionClick = (selectedValue) => {
      setInputValue(selectedValue);
      setSuggestions([]);
    
  };

  // const filteredData = data.filter((item) => item.siege.departement === selectedDepartment);


    return (
<>
            <div className="filter-selector">
            <input
    className="input-filter"
    value={inputValue}
    onChange={handleInputChange}
/>

{inputValue.length > 0 && (
    <div className="suggestions">
        {suggestions.map((department) => (
            <div key={department.num_dep} 
            className="suggestion"
            onClick={() => handleSuggestionClick(department.num_dep)}
            >
                <div>{department.num_dep}</div>
                <div>{department.dep_name}</div>
                <div>{department.region_name}</div>
            </div>
        ))}
    </div>
)}

            
            
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