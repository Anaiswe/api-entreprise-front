import { Link } from "react-router-dom";
import { useData } from "../../functions/DataContext";
import Loader from "../Loader/Loader";
import "./dataContainer.css";

const DataContainer = ({ theme }) => {
  const {
    data,
    isLoading,
    setSelectedItem,
  } = useData();


  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  const nbOfResults = data[1];
  const className = theme === "bg-dark" ? "-dark" : "-light";


  if (isLoading) {
    return <Loader theme={theme} />;
  } else {
    return (
      <div className={`data-container${className}`}>
        <p>Résultats trouvés : {nbOfResults}</p>
        
        <div className={`cards-container${className}`}>
          {data[0]?.map((item, index) => (
            <div className={`card${className}`} key={index}>
              <div className={`card-content${className}`}>
                <h3>{item.nom_raison_sociale}</h3>
                <p>{item.siege.adresse}</p>
                <p>siret :{item.siege.siret}</p>
                <p>siren :{item.siren}</p>
                <p>{item.nom_complet}</p>
                <div className="details-link">
                  <Link
                    to={`/Details/${item.id}`}
                    className={`btn-info${className}`}
                    onClick={() => {
                      console.log("this f**", item);
                      handleSelectedItem(item); 
                   
                    }}
           
                  >
                    Voir les détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  
};

export default DataContainer;
