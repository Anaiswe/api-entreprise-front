import { Link } from "react-router-dom";
import { useData } from "../../functions/DataContext";
import Loader from "../Loader/Loader";

import "./dataContainer.css";

const DataContainer = ({ theme }) => {

  const className = theme === "bg-dark" ? "-dark" : "-light";

  const {
    data,
    isLoading,
    search,
    setSelectedItem,
  } = useData();

  // console.log("SEARCH", search)


  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  if (isLoading) {
    return <Loader theme={theme} />;
  } else {
    return (
      <>
      <div className={`data-container${className}`}>
        <div className={`cards-container${className}`}>
          {data[0]?.map((item, index) => (
            <div className={`card${className}`} key={index}>
              <div className={`card-content${className}`}>
              <p>{item.nom_complet}</p>
                <p>{item.siege.adresse}</p>   
                <div className="details-link">
                  <Link
                    to={`/Details/${item.id}`}
                    className={`btn-info${className}`}
                    onClick={() => {
                      console.log(item);
                      handleSelectedItem(item); 
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
    );
  }

  
};

export default DataContainer;
