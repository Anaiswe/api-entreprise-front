
//styles
import "./dataContainer.css";

//components



const DataContainer = ({ data, theme }) => {
  // Fonction pour récupérer les informations siret et ville
  const getMatchingEtablissementsInfo = () => {
    const matchingEtablissementsInfo = {};

    data[0].forEach((etablissement, index) => {
      if (etablissement.matching_etablissements) {
        const matchingEtablissements = etablissement.matching_etablissements.map(
          (matchingEtablissement) => {
            const { siret, libelle_commune, est_siege } = matchingEtablissement;
            return { siret, libelle_commune, est_siege };
          }
        );
        matchingEtablissementsInfo[index] = matchingEtablissements;
      }
    });

    return matchingEtablissementsInfo;
  };

  const matchingEtablissementsInfo = getMatchingEtablissementsInfo();
  console.log("this matching etablissement22", matchingEtablissementsInfo);

  const nbOfResults = data[1];
  const className = theme === null || "bg-dark" ? "-dark" : "-light";

  return (
    <div className={`data-container${className}`}>
      <table className={`table-data${className}`}>
        <thead>
          <tr>
            <th>Résultats trouvés : {nbOfResults}</th>
            <th>Raison sociale</th>
            <th>Adresse</th>
            <th>Établissements</th>
          </tr>
        </thead>
        <tbody>
          {data[0]?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.nom_raison_sociale}</td>
              <td>{item.siege.adresse}</td>
          
              <td>
                {matchingEtablissementsInfo[index]?.map((matchingEtablissement, i) => (
                  <div key={i}>
                    <div>{matchingEtablissement.libelle_commune}</div>
                    <div>{matchingEtablissement.siret}</div>
                    <div>{matchingEtablissement.est_siege ? 'Siège social' : 'Non siège social'}</div>
                  </div>
                ))}
              </td>
              <td>
                <button
                  className={`btn-info${className}`}
                  onClick={() => {
                    const url = `/Details/${item.siege.siret}`;
                    window.open(url, "_blank");
                  }}
                >
                  <p className="btn-text">Voir les informations</p>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataContainer;