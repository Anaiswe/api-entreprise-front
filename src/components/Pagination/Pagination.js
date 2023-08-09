import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import "./pagination.css";


const Pagination = ({ data, onPaginate, theme}) => {

    // State to keep track of the active page


  const currentPage = Number(data[2]) || 1;
  const totalPages = data[4];
  const tableClassName = theme === "" || theme === "bg-dark" ? "dark" : "light";

  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page) => {
    setActivePage(page); // Mise à jour de l'état local
    onPaginate(page);
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
        (page >= currentPage - Math.floor(visiblePages / 2) && page <= currentPage + Math.floor(visiblePages / 2))
      ) {
        pageButtons.push(
          <button
            key={page}
            className={`pagination-button-${tableClassName} ${activePage === page ? 'active' : ''}`}
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
      <div className={`pagination-container-${tableClassName}`}>

        <button className={`button-${tableClassName} ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
        > <FontAwesomeIcon icon={faMinus}/>
        </button>
        {renderPageButtons()}
        <button className={`button-${tableClassName} ${currentPage === data[4] ? 'active' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
        > <FontAwesomeIcon icon={faPlus}/>
        </button>
        </div>
      </>
   
  );
};

export default Pagination;
