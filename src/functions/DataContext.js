import React, { createContext, useContext, useState, useEffect } from "react";
import FetchData from "./FetchData";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const storedSearch = localStorage.getItem("currentSearch") || "";
  const [search, setSearch] = useState("");
  const [departement, setDepartement] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isIdcc, setIdcc] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(12);
  const [limitMatchingEtablissments, setLimitMatchingEtablissments] = useState(100);
  const [selectedItem, setSelectedItem] = useState({});

//   useEffect(() => {
//     localStorage.setItem("currentSearch", search);
// }, [search]);

  useEffect(() => {
    localStorage.setItem("storedData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {

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
        //  console.log(response);
          setIsLoading(false);
 
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

  return (
    <DataContext.Provider value={{ 
      data, 
      setData, 
      isLoading, 
      setIsLoading,
      search,
      setSearch,
      departement,
      setDepartement, 
      postalCode,
      setPostalCode,
      page,
      setPage,
      perPage,
      isIdcc,
      setIdcc,
      setPerpage,
      limitMatchingEtablissments,
      setLimitMatchingEtablissments,
      selectedItem,
      setSelectedItem,
     }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};