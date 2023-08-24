import axios from "axios";

const FetchCodesNaf = async () => {
  let nafUrl = process.env.REACT_APP_NAFURL;
  console.log("this nafUrl", nafUrl)
  
  try {
    const response = await axios.get(nafUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching codes NAF:", error);
    return null;
  }
};

export default FetchCodesNaf;