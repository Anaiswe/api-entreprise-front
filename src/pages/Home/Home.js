import { useState, useEffect } from "react";

//components
import Loader from "../../components/Loader/Loader";
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import DataContainer from "../../components/DataContainer/DataContainer";
import Pagination from "../../components/Pagination/Pagination";
import DataInformations from "../../components/DataInformations/DataInformations";

//functions
import FetchData from "../../functions/FetchData/FetchData";

// styles
import "./home.css";


const Home = ({theme}) => {
  console.log("this theme",  theme)
  // console.log("this selecteditem",  setSelectedItem)

  //States
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [departement, setDepartement] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isIdcc, setIdcc] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(12);
  const [limitMatchingEtablissments, setLimitMatchingEtablissments] = useState(100);

  useEffect(() => {
    const fetchDataApi = async () => {
 
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
         setIsLoading(false);
         //setIsLoading(true);
        //  console.log("THIS RESPONSE DATA", response);

      } catch (error) {
        console.log("THIS ERROR", error);
      }
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
  // console.log(
  //   "THIS I RECEIVED",
  //   search,
  //   departement,
  //   postalCode,
  //   isIdcc,
  //   page,
  //   perPage,
  //   limitMatchingEtablissments
  // );

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
    <div className="home-container">
      <div className="home-search">
        <SearchContainer
        data={data} 
        theme = {theme}
        onSearch={handleSearch}
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
              <DataInformations data={data} theme = {theme}/>
            </div>
            <div className="pagination">
              <Pagination data={data} onPaginate={handlePageChange} theme = {theme} />
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
