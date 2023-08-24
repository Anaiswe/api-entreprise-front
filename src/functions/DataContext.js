import React, { createContext, useContext, useState, useEffect } from "react";
import FetchData from "./FetchData";
import FetchCodesNaf from "./FetchCodesNaf";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const storedSearch = localStorage.getItem("currentSearch") || "";
  const [search, setSearch] = useState(storedSearch);
  const [departement, setDepartement] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isIdcc, setIdcc] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(12);
  const [limitMatchingEtablissments, setLimitMatchingEtablissments] = useState(100);
  const [selectedItem, setSelectedItem] = useState({});
  const [codesNaf, setCodesNaf] = useState([]);


  useEffect(() => {
    // Sauvegarder la valeur de la recherche dans le stockage local chaque fois qu'elle est mise à jour
    localStorage.setItem("currentSearch", search);
}, [search]);

  // Mettre à jour le localStorage chaque fois que les données sont mises à jour dans le contexte
  useEffect(() => {
    localStorage.setItem("storedData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
      // Sauvegarder les données dans le stockage local

    const fetchDataApi = async () => {
      if (search !== "") {
        try {
          setIsLoading(true);
         const response = await FetchData(
           search,
           departement,
           postalCode,
           isIdcc,
           page,
           perPage,
           limitMatchingEtablissments
         );

            
 
         setData(response);
         console.log("THIS AATTAAADDD", response);
          setIsLoading(false);
          //setIsLoading(true);
         //  console.log("THIS RESPONSE DATA", response);
 
       } catch (error) {
         console.log("THIS ERROR", error);
       }
      } else {
        setIsLoading(true)
      };
 
   
    };

    fetchDataApi();

  }, [
    search,
    departement,
    postalCode,
    isIdcc,
    page,
    perPage,
    limitMatchingEtablissments,
  ]);

  console.log("this search", 
  search,
   departement, 
   postalCode, 
   isIdcc,
  page,
  perPage,
  limitMatchingEtablissments,);

  useEffect(() => {
    const fetchAndSetCodesNaf = async () => {
      const fetchedCodesNaf = await FetchCodesNaf();
      if (fetchedCodesNaf) {
        setCodesNaf(fetchedCodesNaf); // Stockez le premier objet du tableau
      }
    };
  
    fetchAndSetCodesNaf();
  }, []);

  console.log("this codes Naf", codesNaf )



  return (
    <DataContext.Provider value={{ data, 
      setData, 
      isLoading, 
      setIsLoading,
      search,
      setSearch,
      departement,
      setDepartement, 
      page,
      setPage,
      perPage,
      setPerpage,
      limitMatchingEtablissments,
      setLimitMatchingEtablissments,
      selectedItem,
      setSelectedItem,
      codesNaf
   

     }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};