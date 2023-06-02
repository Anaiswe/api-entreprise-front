import "./dataInformation.css";

const DataInformation = ({ data }) => {
  // console.log("THIS DATAFUCK", data[1]);

  // console.log("this dataAAAAAA", data)
  return (
    <div className="data-infos-container">
      <p>Total search results: {data[1]}</p>
      <p>Page for pagination: {data[2]}</p>
      <p>Nb results per page: {data[3]}</p>
      <p>total pages: {data[4]}</p>
    </div>
  );
};

export default DataInformation;
