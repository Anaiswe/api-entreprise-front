import axios from "axios";

const FetchPostalCode = async (departement) => {

  if (!departement) {

    return null;
  }

  let postalUrl = process.env.REACT_APP_POSTAL;
  
  try {
    const response = await axios.get(`${postalUrl}${departement}`);

    const data =  response.data;

    const deepCopy = JSON.parse(JSON.stringify(data));

    return deepCopy;
  } catch (error) {
    console.error("Error fetching POSTAL:", error);
    return null;
  }
};

export default FetchPostalCode;