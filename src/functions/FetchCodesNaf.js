import axios from "axios";

const FetchCodesNaf = async () => {
  let nafUrl = process.env.REACT_APP_NAFURL;
  
  try {
    const response = await axios.get(nafUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching codes NAF:", error);
    return null;
  }
};

export default FetchCodesNaf;