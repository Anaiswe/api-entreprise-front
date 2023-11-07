import axios from "axios";

const FetchIdcc = async (siret) => {
  let idccUrl = process.env.REACT_APP_IDCCURL;

  try {
    const response = await axios.get(`${idccUrl}${siret}`);
   
    return response.data;
  } catch (error) {
    return null;
  }
};


export default FetchIdcc;