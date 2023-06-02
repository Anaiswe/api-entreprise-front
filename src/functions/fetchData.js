import axios from "axios";

const fetchData = async (
    search,
    departement,
    postalCode,
    isIdcc,
    page,
    perPage,
    limitMatchingEtablissments
    //setIsLoading,
) => {
    //setIsLoading(true);
    const apiUrl = "http://localhost:3000/entreprise?";
    let url = apiUrl;
    const link = "&";
    console.log("THIS URL ORIGIN", url)

    if(search) {
        url += `search=${search}${link}`
        console.log("THIS URL SEARCH", url)
    }
    //else alert ("Vous devez entrez au moins 3 lettres")

    if (departement) {
        url += `departement=${departement}${link}`;
        console.log("THIS URL departement", url);
      }
      //else alert ("Vous devez entrez au moins 2 chiffres")
  
      if (postalCode) {
        url += `postalCode=${postalCode}${link}`;
        console.log("THIS URL SEARCH", url);
      }
       //else alert ("Vous devez entrez au moins 4 chiffres")
  
       if (isIdcc !== undefined) {
        url += `isIdcc=${isIdcc}${link}`;
        console.log(url);
      }
      //toggle idcc

      if (page) {
        url += `page=${page}${link}`;
        console.log("THIS URL page", url);
      }
      //prévoir pagination
  
      if (perPage) {
        url += `perPage=${perPage}${link}`
        console.log("THIS URL perPage", url);
      }
      //prévoir pagination

    if (limitMatchingEtablissments) {
        url += `limitMatchingEtablissments ${limitMatchingEtablissments}${link}`;
        console.log(url)
    }
    //jsp encore sa sert a koi

try {
    const response = await axios.get(url);
    console.log("THIS IS RESPONSE FETCHDATA", response);
    return Object.values(response.data);
} catch (error) {
    console.log("THIS ERROR", error);
    return 0;
}


//setIsLoading(false);

};

export default fetchData;