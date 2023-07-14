
//styles
import "./dataContainer.css";
//function
// import { useTheme } from "../../functions/SetTheme";
//component
// import Switch from "../Switch/Switch";


const DataContainer = ({ data, theme }) => {
  const theme1 = theme;
  console.log("this theme", theme1)
  const  nbOfResults = data[1];

  return (
    <div className="data-container">
      <span className="data-container-title">Résultats trouvés</span>
        <table className="table-data">
          <thead >
               <tr>
                  <th>Résultats trouvés : {nbOfResults}</th>
                  {/* <th>Nom</th> */}
                  <th>Raison sociale</th>
                  <th>adresse</th>
                  {/* <th>dep</th>
                  <th>CP</th> */}
                  {/* <th>Convention collective disponible </th> */}
                  <th>SIRET</th>
                  {/* <th>IDCC</th> */}
                  {/* <th>EFFECTIF</th> */}
                </tr>
                </thead>
                {data[0]?.map((item, index) => {
                  return (
                  <>
                  <tbody className="btn" 
                  onClick={() => {
                    const url = `/Details/${item.siege.siret}`;
                    window.open(url, "_blank");
                    }}>
                      <tr key={index}>
                        <td>{index + 1} / {nbOfResults}</td>
                        <th scope="row" className="data-container">
                                LOL
                               </th>
                      {/* <td>{item.nom_complet}</td> */}
                      <td>{item.nom_raison_sociale}</td>
                      <td>{item.siege.adresse}</td>
                      <td>
                 
                      </td>
                    <td>{" "}
                    {item.tranche_effectif_salarie != null ? item.tranche_effectif_salarie : 0} </td>
            </tr>
          </tbody>


          </>
        )
      })}
      </table>
      </div>
  );
};

export default DataContainer;
