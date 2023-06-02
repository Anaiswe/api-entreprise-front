import Pagination from "react-js-pagination";
import "./Paginate.css";
// require("bootstrap/less/bootstrap.less");

const Paginate = ({
  activePage,
  setActivePage,
  totalItemsCount,
  itemsCountPerPage,
}) => {
  const handlePageChange = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };
  // console.log("activePage=>", activePage);
  // console.log("itemsCountPerPage=>", itemsCountPerPage);

  return (
    <div className="paginate">
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        firstPageText={"FIRST"}
        lastPageText={"LAST"}
        prevPageText={"PREV"}
        nextPageText={"NEXT"}
      />
    </div>
  );
};

export default Paginate;
