import React from "react";
import { useData } from "../../functions/DataContext";

const Test = () => {
  console.log("this fbdjskbfkjsdb")
  const {
    data, 
    setData, 
    isLoading, 
    setIsLoading,
    search,
    setSearch,
    departement,
    setDepartement
    // Ajoutez d'autres variables si nécessaire
  } = useData();

  

  return (
    <div>
      <h2>Informations détaillées : {search}</h2>

    </div>
  );
};

export default Test;