    {/* {showEtablissements && (
      <div className={`etablissements-list${className}`}>
        {headquarters ? (
          <div className={`etablissement-card${className}`}>
            <div className={`etablissement-header${className}`}>
            <h2>Siège</h2>
            <p>{headquarters.libelle_commune}</p>
            
              <button
                className={`btn-toggle${className}`}
                onClick={() => toggleSelectedEtablissement(0)}
              >
                {selectedEtablissementIndex === 0 
                  ? "Masquer les détails" 
                  : "Afficher les détails"}
              </button>
            </div>
            {selectedEtablissementIndex === 0 && (
              <div className={`etablissement-details${className}`}>
                
                <p>Activité principale : {headquarters.activite_principale}</p>
                <p>Siret: {headquarters.siret}</p>
                <p>Adresse: {headquarters.adresse}</p>
                {headquarters.liste_idcc && headquarters.liste_idcc.length > 0 && (
                  <p>Liste IDCC: {headquarters.liste_idcc.join(", ")}</p>
                )}
                {selectedDataItem.siege.tranche_effectif_salarie && (
                  <p>Tranche effectifs: {trancheEffectifData[selectedDataItem.tranche_effectif_salarie]}</p>
                  
                )}
              </div>
            )}
          </div>
        ) : <p>Aucun siège identifié pour cet élément de données.</p>}


        
        {otherEtablissements.map((etablissement, index) => (
          <div key={index} className={`etablissement-card${className}`}>
            <div className={`etablissement-header${className}`}>
              <p>Siret: {etablissement.siret}</p>
              <p>Libellé commune: {etablissement.libelle_commune}</p>
              <p>Est siège: Non</p>
              <button
                className={`btn-toggle${className}`}
                onClick={() => toggleSelectedEtablissement(index + 1)}
              >
                {selectedEtablissementIndex === (index + 1) 
                  ? "Masquer les détails" 
                  : "Afficher les détails"}
              </button>
            </div>
            {selectedEtablissementIndex === (index + 1) && (
              <div className={`etablissement-details${className}`}>
                <h2>Établissement</h2>
                <p>Activité principale : {etablissement.activite_principale}</p>
                <p>Siret: {etablissement.siret}</p>
                <p>Adresse: {etablissement.adresse}</p>
                {etablissement.liste_idcc && etablissement.liste_idcc.length > 0 && (
                  <p>Liste IDCC: {etablissement.liste_idcc.join(", ")}</p>
                )}
                {etablissement.tranche_effectif_salarie && (
                  <p>Tranche effectifs: {etablissement.tranche_effectif_salarie}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    )} */}