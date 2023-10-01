import React, { useState, useEffect } from "react";

import "./dataInformations.css";

const DataInformations = ({data}) => {
    const totalResults = data[1];
    const currentPage = data[2];
    const resultsPerPage = data[3];
    const totalPages = data[4];

    const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(0);
  }, [totalResults]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter < totalResults) {
        setCounter(counter + 1);
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [counter, totalResults]);

return (
    <>
    <div className="data-infos-container">
        <div className="counter-total-results">résultats trouvés:{counter < totalResults ? counter : totalResults} 
        </div>
        <p>page: {currentPage}</p>
        <p>résultats par page: {resultsPerPage}</p>
        <p>pages total: {totalPages}</p>


    </div>
    </>
)
};

export default DataInformations