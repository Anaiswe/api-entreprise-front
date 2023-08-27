import axios from "axios";

const fetchIdcc = async () => {
  let idccUrl = process.env.REACT_APP_IDCCURL;
  const siret = "70201772400072";
  console.log("this idcc url", idccUrl);
  
  try {
    const response = await axios.get(`${idccUrl}/${siret}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching IDCC:", error);
    return null;
  }
};

// Appel de la fonction pour tester
(async () => {
  const idccData = await fetchIdcc();
  console.log("IDCC Data:", idccData);
})();

export default fetchIdcc;