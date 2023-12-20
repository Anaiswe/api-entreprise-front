import { useState, useEffect } from 'react';
import axios from 'axios';

const FetchScrapedData = () => {
  const [conventionData, setConventionData] = useState('');
  const [agreementData, setAgreementData] = useState('');
  const [egaproData, setEgaproData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conventionResponse = await axios.get(process.env.REACT_APP_SCRAPED_IDCC_INFO);
        setConventionData(conventionResponse.data);

        const accordResponse = await axios.get(process.env.REACT_APP_SCRAPED_AGREEMENT_INFO);
        setAgreementData(accordResponse.data);

        const egaproResponse = await axios.get(process.env.REACT_APP_SCRAPED_EGAPRO_INFO);
        setEgaproData(egaproResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return {
    conventionData,
    agreementData,
    egaproData,
  };
};

export default FetchScrapedData;
