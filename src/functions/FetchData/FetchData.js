import axios from "axios";


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
     console.log("THIS IS RESPONSE FETCHDATA", Object.values(response.data));
    return Object.values(response.data);
  } catch (error) {
    // console.log("THIS ERROR", error);
    return 0;
  }
};

export default FetchData ;
