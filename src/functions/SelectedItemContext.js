import React, { createContext, useContext, useState } from "react";

const SelectedItemContext = createContext();

export const SelectedItemProvider = ({ selectedEntreprise }) => {
  const [selectedItem, setSelectedItem] = useState({ item: null, index: null }); // Stockez l'élément et son index

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {selectedEntreprise}
    </SelectedItemContext.Provider>
  );
};

export const useSelectedItem = () => {
  return useContext(SelectedItemContext);
};