import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useData } from "../../functions/DataContext";

import "./pagination.css";

const Pagination = ({ theme }) => {
  const { data, search, page, setPage } = useData();
  const totalPages = data[4];
  const tableClassName = theme === "" || theme === "bg-dark" ? "dark" : "light";

  const [activePage, setActivePage] = useState(page || 1);
  const [initialSearch, setInitialSearch] = useState(search);

  // console.log("search = ", search)

  useEffect(() => {
    if (search !== initialSearch) {
      setActivePage(1);
      setPage(1);
      setInitialSearch(search);
    }
  }, [search, initialSearch, setPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setActivePage(newPage);
      setPage(newPage);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const visiblePages = 5;

    for (let page = 1; page <= totalPages; page++) {
      if (
        // Toujours afficher le premier bouton de page
        page === 1 ||
        // Toujours afficher le dernier bouton de page
        page === totalPages ||
        // Afficher les pages proches de la page actuelle
        (page >= activePage - Math.floor(visiblePages / 2) &&
          page <= activePage + Math.floor(visiblePages / 2))
      ) {
        pageButtons.push(
          <button
            key={page}
            className={`pagination-button-${tableClassName} ${
              activePage === page ? "active" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        );
      }
    }
    return pageButtons;
  };

  return (
    <>
      <div className={`pagination-container`}>
        <button
          className={`button-${tableClassName} ${
            activePage === 1 ? "active" : ""
          }`}
          onClick={() => handlePageChange(activePage - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {renderPageButtons()}
        <button
          className={`button-${tableClassName} ${
            activePage === totalPages ? "active" : ""
          }`}
          onClick={() => handlePageChange(activePage + 1)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </>
  );
};

export default Pagination;
