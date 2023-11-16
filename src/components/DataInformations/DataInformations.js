import React, { useState, useEffect } from "react";

import "./dataInformations.css";

const DataInformations = ({data}) => {
    const totalResults = data[1];

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
        <p>résultats trouvés:{counter < totalResults ? counter : totalResults} 
        </p>
    </>
)
};

export default DataInformations