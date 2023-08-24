import React from "react";
import { useData } from "../../functions/DataContext";

// //components
import Loader from "../../components/Loader/Loader";
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import DataContainer from "../../components/DataContainer/DataContainer";
import Pagination from "../../components/Pagination/Pagination";
import DataInformations from "../../components/DataInformations/DataInformations";

// styles
import "./home.css";


 const Home = ({theme}) => {
  console.log("this theme",  theme)
  // console.log("this selecteditem",  setSelectedItem)

  const {
    data, 
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
    postalCode,
    setPostalCode,
    isIdcc,
    setIdcc,
    limitMatchingEtablissments
    // Ajoutez d'autres variables si nécessaire
  } = useData();
  
  console.log("THIS JFHSBS HOOOOME DATA", data[0])

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

  const handleDepartementFilter = (departementValue) => {
    setDepartement(departementValue);
  };

  const handlePostalCodeFilter = (postalCodeValue) => {
    setPostalCode(postalCodeValue);
  };

  const handlePageChange = (page) => {
    // console.log("this is PAGE", page)
    setPage(page);
  };

  return (
    <>
    <div>PACHOUR</div>
    <div className="home-container">
    
      <div className="home-search">
        <SearchContainer
  
        theme = {theme}
     
        onFilterDepartement={handleDepartementFilter}
        onFilterCP={handlePostalCodeFilter}
        />
      </div>
            <div className="home-text">
              <span>PER PAGE : {perPage}</span>
              <span>PAGE : {page}</span>
              <span>SEARCH : {search}</span>
              <span>DEPARTEMENT: {departement}</span>
              <span>POSTALCODE: {postalCode}</span>
              <span>isIdcc : {isIdcc}</span>
              <span>limitMatchingEtablissments : {limitMatchingEtablissments}</span>
            </div>

            <div className="data-informations">
              <DataInformations 
              data={data} 
              theme = {theme}/>
            </div>
            <div className="pagination">
              <Pagination 
              data={data} 
              onPaginate={handlePageChange} 
              theme = {theme} />
            </div>
            <div className="table-data">
              <DataContainer 
              search= {search} 
              data={data} 
              theme={theme} />
            </div>
            <div className="pagination">
              <Pagination 
              data={data} 
              onPaginate={handlePageChange} 
              theme = {theme} />
            </div>
     
     
        {isLoading ? ( 
          <Loader theme={theme} />
        ) : (
          <>
            <div className="table-data">
              <DataContainer search= {search} data={data} theme={theme} />
            </div>
            <div className="pagination">
              <Pagination data={data} onPaginate={handlePageChange} theme = {theme} />
            </div>
          </>
        )};
        </div>
        </>
      );
    };
    
    export default Home;
