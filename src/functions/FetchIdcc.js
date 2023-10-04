import axios from "axios";

const fetchIdcc = async (siret) => {
  let idccUrl = process.env.REACT_APP_IDCCURL;
//   const siret = "70201772400072";

  try {
    const response = await axios.get(`${idccUrl}${siret}`);
    // console.log("this idcc data", response.data)
    return response.data;
  } catch (error) {
    // console.error("Error fetching IDCC:", error);
    return null;
  }
};


export default fetchIdcc;