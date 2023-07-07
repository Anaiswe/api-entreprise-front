//styles
import "./dataContainer.css";

const DataContainer = ({ data }) => {

  return (
    <div className="data-container">
      <div>
        <table >
          <thead>
               <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Raison sociale</th>
                  <th scope="col">dep</th>
                  <th scope="col">CP</th>
                  <th scope="col">Convention collective disponible </th>
                  <th scope="col">SIRET</th>
                  <th scope="col">IDCC</th>
                  <th scope="col">EFFECTIF</th>
                </tr>
                </thead>
                {data[0]?.map((item) => {
                  return (
                  <>
                  <tbody>
                    <tr> #
                      <th scope="row" className="data-container"></th>
                      <td>{item.nom_complet}</td>
                      <td>{item.nom_raison_sociale}</td>
                      <td>{item.siege.departement}</td>
                      <td>{item.siege.code_postal}</td>
                      <td>{" "}
                      {item.complements.convention_collective_renseignee === true ? "oui" : "non"} 
                      </td>
                      <td>{item.siege.siret} 
                      <button
                      className="btn"
                      onClick={() => {
                        const url = `/Details/${item.siege.siret}`;
                        window.open(url, "_blank");
                        }}
                        >
                          En Savoir plus
                          </button>
                      </td>
                      {/* <td> IDCC:{" "}
                      {item.siege.liste_idcc != null
                      ? item.siege.liste_idcc[0] : "non"}
                      <a
                  href={`https://www.legifrance.gouv.fr/search/kali?tab_selection=kali&searchField=IDCC&query=2120&searchType=ALL&texteBase=TEXTE_BASE&typePagination=DEFAUT&sortValue=PERTINENCE&pageSize=10&page=1&tab_selection=kali#kali`}>
                    Consultez la convention collective
                    </a>
                    {" "}
                    {item.siege.liste_idcc != null ? item.siege.liste_idcc[1] : "non"}
                    </td> */}
                    <td>{" "}
                    {item.tranche_effectif_salarie != null ? item.tranche_effectif_salarie : 0} </td>
            </tr>
          </tbody>
          </>
        )
      })}
      </table>
      </div>
    </div>
  );
};

export default DataContainer;
