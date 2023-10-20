import axios from "axios";

// Fonction pour effectuer une copie profonde d'un objet ou d'un tableau
function deepCopy(data) {
  if (Array.isArray(data)) {
    // console.log("this array",Array.isArray(data) )
    return data.map((item) => deepCopy(item));
  } else if (typeof data === 'object' && data !== null) {
    const copiedObject = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        copiedObject[key] = deepCopy(data[key]);
      }
    }
    // console.log("this data", copiedObject);
    return copiedObject;
  } else {
    // console.log("this data", data)
    
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
  
  const link = "&";


  if (search) {
    url += `search=${search}${link}`;
  } else {
    throw new Error("No search value provided");
    
  }

  if (departement) {
    url += `departement=${departement}${link}`;

  }

  if (postalCode) {
    url += `postalCode=${postalCode}${link}`;
  }

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
    // console.log(url);
  }

  try {
    const response = await axios.get(url);
    const valuesOfData = Object.values(response.data);
    const copiedValues = deepCopy(valuesOfData);

    // console.log(copiedValues);

    // Calculer des ID uniques basés sur le numéro de page et l'index
    copiedValues[0].forEach((item, index) => {
      item.id = (page - 1) * perPage + index + 1;
    });
 

    // return Object.values(response.data);
    console.log("this values returned in FtchData", copiedValues, "this response", response.data)
    return copiedValues;
  } catch (error) {
    // console.log("THIS ERROR", error);
    return null;
  }
};

export default FetchData ;
