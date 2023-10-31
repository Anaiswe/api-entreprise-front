import axios from "axios";

const FetchData = async (search, departement, postalCode, isIdcc, page, perPage, limitMatchingEtablissments) => {
  if (!search) {
    throw new Error("No search value provided");
  }

  const params = {};

  params.search = search;

  if (departement) {
    params.departement = departement;
  }

  if (postalCode) {
    params.postalCode = postalCode;
  }

  if (isIdcc !== undefined) {
    params.isIdcc = isIdcc;
  }

  if (page) {
    params.page = page;
  }

  if (perPage) {
    params.perPage = perPage;
  }

  if (limitMatchingEtablissments) {
    params.limitMatchingEtablissments = limitMatchingEtablissments;
  }

  const url = process.env.REACT_APP_URL + new URLSearchParams(params).toString();
  //"http://localhost:3000/entreprise?"

  try {
    const response = await axios.get(url);
    console.log("this response data", response.data);
    const valuesOfData = Object.values(response.data);
    console.log("this values returned in FetchData", valuesOfData, "this response", response.data);
    return valuesOfData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default FetchData;
