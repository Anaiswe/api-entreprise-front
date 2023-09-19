import React from "react";

import { trancheEffectifData } from "../../functions/ExportDefinitions";

const DetailsHeader = ({ selectedDataItem }) => {
  if (!selectedDataItem) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
        <p>Raison sociale: {selectedDataItem.nom_raison_sociale}</p>
        <p>Nom complet: {selectedDataItem.nom_complet}</p>
        <p>Siren: {selectedDataItem.siren}</p>
        <p>Catégorie entreprise: {selectedDataItem.categorie_entreprise}</p>
        <p>Nature juridique: {selectedDataItem.nature_juridique}</p>
        <p>Activité principale: {selectedDataItem.section_activite_principale}</p>
        <p>Nombre d'établissements: {selectedDataItem.nombre_etablissements_ouverts}</p>
        <p>Tranche effectifs: {trancheEffectifData[selectedDataItem.tranche_effectif_salarie]}</p>
        <p>Tranche effectifs: {selectedDataItem.tranche_effectif_salarie}</p>
        <p>Egapro: {selectedDataItem.complements.egapro_renseignee ?
          <a href={`https://egapro.travail.gouv.fr/index-egapro/recherche?query=${selectedDataItem.siren}`} target="_blank" rel="noopener noreferrer">Consulter l'index sur le site du ministère du travail</a> : "NON"}</p>
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