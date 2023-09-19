import axios from 'axios';

const GetPostalCodeData = async (postalCode) => {

  let postalCodeURL = process.env.REACT_APP_POSTALURL;
  console.log("this POSTALURL", postalCodeURL )
  try {
    const response = await axios.get(`${postalCodeURL}${postalCode}`);
    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données :', error);
    throw error; 
  }
};

export default GetPostalCodeData;