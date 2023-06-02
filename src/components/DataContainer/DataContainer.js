
//Components
import DataInformation from "./DataInformations/DataInformation";

//styles
import "./dataContainer.css"

const DataContainer = ({ data }) => {



    return (
        <div className="data-container">
            {/* data container : {" "} */}
            {data[0]?.map((item, index) => {
                console.log("THIS DATA", data[1]);
                console.log("THIS index", index);
                console.log("this item", item);

             
                return (
                    <>
                    <DataInformation data = {data}/>
                    <div className="d-flex table-data" key={index}>
              <p>NOM: {item.nom_complet}</p>
              <p>TEST DATA : {data[1]}</p>
              <p>NOM: {index.nom_complet}</p>
              <p>Convention collective disponible : {item.complements.convention_collective_renseignee === true? 'oui' : 'non'}</p>
              <p>DEP: {item.siege.departement}</p>
              <p>CP: {item.siege.code_postal}</p>
              <p>RAISON SOCIALE: {item.nom_raison_sociale}</p>
              <p>NOMBRE D'ETABLISSEMENTS: {item.nombre_etablissements}</p>
              <p>catégorie d'entreprise: {item.categorie_entreprise}</p>
              <p>SIREN: {item.siren}</p>
              <p>SIRET: {item.siege.siret}</p>
             
              <p>IDCC: {item.siege.liste_idcc != null ? item.siege.liste_idcc[0] : "non"}</p>
              <p>IDCC: {item.siege.liste_idcc != null ? item.siege.liste_idcc[1] : "non"}</p>
              <p>EFFECTIF: {item.tranche_effectif_salarie != null? item.tranche_effectif_salarie : 0}</p>
                        
                    </div>
                    </>
                )
            })}

        </div>
        

    );
};

export default DataContainer;