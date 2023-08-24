import axios from "axios";

// Fonction pour effectuer une copie profonde d'un objet ou d'un tableau
function deepCopy(data) {
  if (Array.isArray(data)) {
    return data.map((item) => deepCopy(item));
  } else if (typeof data === 'object' && data !== null) {
    const copiedObject = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        copiedObject[key] = deepCopy(data[key]);
      }
    }
    return copiedObject;
  } else {
    return data;
  }
}


const FetchData = async (
  search,
  departement,
  postalCode,
  isIdcc,
  page,
  perPage,
  limitMatchingEtablissments
) => {

  let url = process.env.REACT_APP_URL;
  // console.log("this URLAPI", url)
  
  const link = "&";


  if (search) {
    url += `search=${search}${link}`;

  }

  if (departement) {
    url += `departement=${departement}${link}`;

  }

  if (postalCode) {
    url += `postalCode=${postalCode}${link}`;
  }
  //else alert ("Vous devez entrez au moins 4 chiffres")

  if (isIdcc !== undefined) {
    url += `isIdcc=${isIdcc}${link}`;
  }

  if (page) {
    url += `page=${page}${link}`;
  }

  if (perPage) {
    url += `perPage=${perPage}${link}`;
  }

  if (limitMatchingEtablissments) {
    url += `limitMatchingEtablissments=${limitMatchingEtablissments}${link}`;
    console.log(url);
  }
  //jkroi kc a koi sa sert

  try {
    const response = await axios.get(url);
    const valuesOfData = Object.values(response.data);
    const copiedValues = deepCopy(valuesOfData); // Effectuer une copie profonde

    console.log("THIS COPIED RESPONSE FETCHDATA", copiedValues);

    // Calculer des ID uniques basés sur le numéro de page et l'index
    copiedValues[0].forEach((item, index) => {
      item.id = (page - 1) * perPage + index + 1; // Calcul d'un ID unique
    });
 

    // return Object.values(response.data);
    return copiedValues;
  } catch (error) {
    // console.log("THIS ERROR", error);
    return null;
  }
};

export default FetchData ;
