//Components
import DataInformation from "./DataInformations/DataInformation";

//styles
import "./dataContainer.css";

const DataContainer = ({ data }) => {
  const getIdccStrings = (data) => {
    // console.log("THIS GETIDCC TEST");

    if (Array.isArray(data)) {
      const idccToString = [];

      data.forEach((item, index) => {
        const listIdcc = item.siege.liste_idcc;
        //let idccToString = item.siege.liste_idcc;
        if (listIdcc && listIdcc?.length > 0) {
          listIdcc.forEach((idcc, subIndex) => {
            console.log("this IDCC", idcc);
            idccToString.push(<p key={`${index}_${subIndex}`}>{idcc}</p>);
          });
        } else {
          console.log("THIS IDCC: non");
        }
      });
      return idccToString;
    } else {
      console.log("THIS Invalid data format.");
    }
  };
  return (
    <div className="data-container">
      {/* data container : {" "} */}
      {data[0]?.map((item, index) => {
        console.log("THIS DATA", data[1]);
        console.log("THIS index", index);
        console.log("this item", item);

        console.log("this item idcc", item.siege.liste_idcc);
        // console.log("this getidccstringHTML", getIdccStrings(data[0]));

        return (
          <>
            <DataInformation data={data} />
            <div className="d-flex table-data" key={index}>
              <p>NOM: {item.nom_complet}</p>
              {/* <p>TEST DATA : {data[1]}</p> */}
              {/* <p>TEST DATA : {getIdccStrings(data[0])}</p> */}
              <div>Liste IDCC {getIdccStrings(item)}</div>
              <p>NOM: {index.nom_complet}</p>
              <p>
                Convention collective disponible :{" "}
                {item.complements.convention_collective_renseignee === true
                  ? "oui"
                  : "non"}
              </p>
              <p>DEP: {item.siege.departement}</p>
              <p>CP: {item.siege.code_postal}</p>
              <p>RAISON SOCIALE: {item.nom_raison_sociale}</p>
              <p>NOMBRE D'ETABLISSEMENTS: {item.nombre_etablissements}</p>
              <p>catégorie d'entreprise: {item.categorie_entreprise}</p>
              <p>SIREN: {item.siren}</p>
              <p>SIRET: {item.siege.siret}</p>

              <p>
                IDCC:{" "}
                {item.siege.liste_idcc != null
                  ? item.siege.liste_idcc[0]
                  : "non"}
                <a
                  href={`https://www.legifrance.gouv.fr/search/kali?tab_selection=kali&searchField=IDCC&query=2120&searchType=ALL&texteBase=TEXTE_BASE&typePagination=DEFAUT&sortValue=PERTINENCE&pageSize=10&page=1&tab_selection=kali#kali`}
                >
                  Consultez la convention collective
                </a>
              </p>
              <p>
                IDCC:{" "}
                {item.siege.liste_idcc != null
                  ? item.siege.liste_idcc[1]
                  : "non"}
              </p>
              <p>
                EFFECTIF:{" "}
                {item.tranche_effectif_salarie != null
                  ? item.tranche_effectif_salarie
                  : 0}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default DataContainer;
