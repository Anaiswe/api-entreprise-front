//import axios from "axios";
import { useState, useEffect } from "react";

//components
import Loader from "../../components/Loader/Loader";
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import DataContainer from "../../components/DataContainer/DataContainer";
// import DataInformation from "../../components/DataContainer/DataInformations/DataInformation";

//functions
import fetchData from "../../functions/fetchData";

// styles
import "./home.css";

const Home = () => {
  //States
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [departement, setDepartement] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isIdcc, setIdcc] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [limitMatchingEtablissments, setLimitMatchingEtablissments] =
    useState(1);

  const [data, setData] = useState([]);

  //Init?

  //UseEffect
  useEffect(() => {
    const fetchDataApi = async () => {
      const filterObject = (obj, keys) => {
        const newObj = {};

        if (!keys || keys.length === 0) {
          return obj;
        }

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];

          if (obj[key]) {
            newObj[key] = obj[key];
          }
        }
        // console.log("this newObj", newObj)
        return newObj;
      };

      // console.log("thiss filtersObjDJSQHS", filterObject(search));

      try {
        const response = await fetchData(
          search,
          departement,
          postalCode,
          isIdcc,
          page,
          perPage,
          limitMatchingEtablissments
        );
        //const dataArray = Object.values(response);
        //console.log("THIS DATAARRAY", response)
        setData(response);
        setIsLoading(false);
        //console.log("THIS RESPONSE DATA", response);
        // console.log("THIS DANS MA HOME CACHEYYYY", response);
        // console.log("THIS FILTERS DEP", filterObject(response, []));
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
  console.log(
    "THIS I RECEIVED",
    search,
    departement,
    postalCode,
    isIdcc,
    page,
    perPage,
    limitMatchingEtablissments
  );

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    // console.log("this searcchbar on home", searchValue);
  };

  const handleDepartementFilter = (departementValue) => {
    // console.log("this dep value", departementValue);
    setDepartement(departementValue);
  };

  const handlePostalCodeFilter = (postalCodeValue) => {
    // console.log("this CP value");
    setPostalCode(postalCodeValue);
  };

  //console.log(filterObject(user, ["firstname", "alias"]));

  return (
    <>
      <div className="home-container">
        <SearchContainer
          onSearch={handleSearch}
          onFilterDepartement={handleDepartementFilter}
          onFilterCP={handlePostalCodeFilter}
        />
      </div>
      {/* isLoading ? 
    (
      //<Loader/>
    ) : ( */}
      <div className="home">
        HOMEPAGE
        <span></span>
        <div className="home-text">
          <span>PER PAGE : {perPage}</span>
          <span>PAGE : {page}</span>
          <span>SEARCH : {search}</span>
          <span>DEPARTEMENT: {departement}</span>
          <span>POSTALCODE: {postalCode}</span>
          <span>isIdcc : {isIdcc}</span>
          <span>limitMatchingEtablissments : {limitMatchingEtablissments}</span>
        </div>
        <div className="data-container">
          <DataContainer data={data} />
        </div>
      </div>
    </>
  );
};

export default Home;
