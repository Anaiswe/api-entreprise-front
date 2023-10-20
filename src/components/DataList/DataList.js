// DataList.js

import { Link } from "react-router-dom";
import { useData } from "../../functions/DataContext";

const DataList = ({ theme }) => {
  const { data, setSelectedItem } = useData();
  const className = theme === "bg-dark" ? "-dark" : "-light";

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  return (

      <div className={`list-container${className}`}>
        {data[0]?.map((item, index) => (
          <div className={`card-container${className}`} key={index}>
            <div className={`card-content${className}`}>
             
                <Link
                  to={`/Details/${item.id}`}
                  className={`btn-link${className}`}
                  onClick={() => handleSelectedItem(item)}
                  style={{ textDecoration: 'none' }}
                >
                 <p>{item.nom_complet}</p>
              <p>{item.siege.adresse}</p>   
                </Link>
            
            </div>
          </div>
        ))}
      </div>

  );
};

export default DataList;














// import "./dataList.css";

// const DataList = ({ onSelect, theme, extractedData }) => {

//   const className = theme === "bg-dark" ? "-dark" : "-light";

//   const handleSelect = (item) => {
//     onSelect(item.nom_complet);
//   };

//   return (
//     <div className={`list-container${className}`}>
//       {extractedData?.map((item, index) => (
//         <div className={`card-container${className}`} key={index} onClick={() => handleSelect(item)}>
//           <div className={`card-content${className}`}>
//             <p>{item.nom_complet} ({item.nom_raison_sociale})</p>
//             <p>{item.siege.libelle_commune} ({item.siege.departement})</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DataList;
