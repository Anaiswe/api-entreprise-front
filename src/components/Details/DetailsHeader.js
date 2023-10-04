import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";


import FetchCodesNaf from "../../functions/FetchCodesNaf";
import { trancheEffectifData, activitePrincipaleData } from "../../functions/ExportDefinitions";

const DetailsHeader = ({ selectedDataItem }) => {

  const  [setFetchCodesNafData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchCodesNaf();
        setFetchCodesNafData(data);
      } catch (error) {
        console.error("Error fetching codes NAF:", error);
      }
    };

    fetchData();
  }, [setFetchCodesNafData]);

  if (!selectedDataItem) {
    return <div>Chargement...</div>;
  };

    // Fonction pour obtenir la valeur de l'activité principale
    const getActivitePrincipaleLabel = (codeActivite) => {
      return activitePrincipaleData[codeActivite] || "Non renseigné";
    };

  return (
    <div>
        <p>Raison sociale: {selectedDataItem.nom_raison_sociale}</p>
        <p>Nom complet: {selectedDataItem.nom_complet}</p>
        <p>Siren: {selectedDataItem.siren}</p>
        <p>Activité : {getActivitePrincipaleLabel(selectedDataItem.section_activite_principale)}</p>
        <p>{selectedDataItem.nombre_etablissements_ouverts} établissement(s)</p>
        <p>{trancheEffectifData[selectedDataItem.tranche_effectif_salarie]}</p>
        {/* <p>Tranche effectifs: {selectedDataItem.tranche_effectif_salarie}</p> */}
        <p> Index d'égalité professionnelle: {selectedDataItem.complements.egapro_renseignee ?
          <a href={`https://egapro.travail.gouv.fr/index-egapro/recherche?query=${selectedDataItem.siren}`} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLink} size="xl" className="glass-icon" />
          </a> : "non renseigné"}</p>
        <p>Activité principale : {selectedDataItem.siege.activite_principale}</p>
        <p>Conventions collectives :
          {selectedDataItem.siege &&
          selectedDataItem.siege.liste_idcc &&
          selectedDataItem.siege.liste_idcc.length > 0 && (
          <div>
            {selectedDataItem.siege.liste_idcc.map((idcc, index) => (
              <p key={index}>{idcc}</p>
            ))}
          </div>
        )}
        </p>

    </div>
  );
};

export default DetailsHeader;