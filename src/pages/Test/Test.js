// pages/Test/Test.js
import { useState, useEffect } from "react";
import { useData } from "../../functions/DataContext";
import { useLocation } from "react-router-dom";

const Test = () => {
  const location = useLocation();
  const { selectedItem } = location.state;
  console.log("this Selected Item in Test:", selectedItem);
  
  // Vous pouvez utiliser un état local pour stocker les détails de l'élément sélectionné
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);

  useEffect(() => {
    // Assurez-vous que selectedItem est défini avant de continuer
    if (selectedItem) {
      // Mettez à jour l'état avec les détails de l'élément sélectionné
      setSelectedItemDetails(selectedItem);
    }
  }, [selectedItem]);



  return (
    <div>
      {selectedItemDetails ? (
        <div>
          <h2>Details de l'élément sélectionné</h2>
          <p>Nom complet: {selectedItemDetails.nom_complet}</p>
          <p>Nom raison sociale: {selectedItemDetails.nom_raison_sociale}</p>
          {/* Affichez d'autres détails ici */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Test;