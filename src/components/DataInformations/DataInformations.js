import "./dataInformations.css";

const DataInformations = ({data}) => {
    const totalResults = data[1];
    const currentPage = data[2];
    const resultsPerPage = data[3];
    const totalPages = data[4];
    console.log("this data innfos", totalResults)

return (
    <>
    <div className="data-infos-container">
    <p>résultats trouvés: {totalResults}</p>
    <p>page: {currentPage}</p>
    <p>résultats par page: {resultsPerPage}</p>
    <p>pages total: {totalPages}</p>

    </div>
    </>
)
};

export default DataInformations