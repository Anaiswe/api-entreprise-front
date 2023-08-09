// DataContext.js

import { createContext, useState, useContext } from "react";

// Créer le contexte
const DataContext = createContext();

// Créer un fournisseur pour le contexte qui encapsule l'état de données
export const DataProvider = ({ props }) => {
    const [dataWithIdState, setDataWithIdState] = useState({});

  return (
    <DataContext.Provider value={{ dataWithIdState, setDataWithIdState }}>
      {props}
    </DataContext.Provider>
  );
};

// Utiliser un hook personnalisé pour accéder au contexte
export const useData = () => {
  return useContext(DataContext);
};
