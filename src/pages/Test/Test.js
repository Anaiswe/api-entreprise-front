// pages/Test/Test.js
import { useState, useEffect } from "react";
import { useData } from "../../functions/SelectedItemContext";
import { useLocation } from "react-router-dom";

const Test = () => {
  // const location = useLocation();
  // const [selectedItem, setSelectedItem] = useState(null);

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const selectedItemStr = params.get('selectedItem');
    
  //   if (selectedItemStr) {
  //     const parsedSelectedItem = JSON.parse(decodeURIComponent(selectedItemStr));
  //     setSelectedItem(parsedSelectedItem);
  //   }
  // }, [location.search]);



  return (
    <div>
      <h2>Informations détaillées</h2>



    </div>
  );
};

export default Test;