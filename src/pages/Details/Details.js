import { useParams } from "react-router-dom";
import FetchData from "../../functions/FetchData/FetchData";
import { useEffect, useState } from "react";

// styles
import "./details.css";

const Details = () => {
  const { siret } = useParams();
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchData(siret);
        setCompanyData(data);
      } catch (error) {
        console.log("this error", error);
      }
    };

    fetchData();
  }, [siret]);

  if (!companyData) {
    return <div>Loading...</div>;
  }

  console.log("this comppanyData", companyData[0])

  return (
    <>
      <div className="details-container">
        <h2>Company Details</h2>
        <p>Siret: {siret}</p>
  
        {companyData[0].map((item, index) => (
          <div key={index}>
            <p>Nom complet: {item.nom_complet}</p>
            <p>Nom raison sociale: {item.nom_raison_sociale}</p>
            {item.siege.liste_idcc != null && (
              <div>
                <p>IDCC:{" "}</p>
                <ul>
                  {item.siege.liste_idcc.map((idcc, idccIndex) => {
                    // Filtrer les deux derniers chiffres si idcc commence par "00"
                    if (idcc.startsWith("00")) {
                      idcc = idcc.substring(2);
                    }
                    return (
                      <li key={idccIndex}>
                        {idcc === "0" || idcc === "9999" ? (
                          "Aucune convention collective répertoriée"
                        ) : (
                          <>
                            {idcc}{" "}
                            <a
                              href={`https://www.legifrance.gouv.fr/search/kali?tab_selection=kali&searchField=IDCC&query=${idcc}&searchType=ALL&texteBase=TEXTE_BASE&typePagination=DEFAUT&sortValue=PERTINENCE&pageSize=10&page=1&tab_selection=kali`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Consultez la convention convention_collective_renseignee
                            </a>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
  
            {/* Ajoutez d'autres informations sur l'entreprise selon votre besoin */}
            <span>
              <a
                href={`https://www.legifrance.gouv.fr/search/acco?tab_selection=acco&searchField=ALL&query=*&searchProximity=&searchType=ALL&isAdvancedResult=&isAdvancedResult=&dateDiffusion=&dateSignature=&siret=${siret}&typePagination=DEFAULT&sortValue=PERTINENCE&pageSize=10&page=1&tab_selection=acco#acco`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultez les accords d'entreprise disponibles sur Legifrance
              </a>
            </span>
  
            {/* Itérer sur matching_etablissements */}
            {/* {item.matching_etablissements &&
              item.matching_etablissements.map((etablissement, etablissementIndex) => (
                <div key={etablissementIndex}>
                  <p>Liste IDCC: {etablissement.listeIdcc.join(", ")}</p>
                  <p>Siret: {etablissement.siret}</p>
                </div>
              ))} */}
          </div>
        ))}
      </div>
    </>
  );
  };
  
export default Details;
