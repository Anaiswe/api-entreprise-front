import { useState } from "react";

import "./pagination.css";


const Pagination = ({ data, onPaginate}) => {
  const currentPage = Number(data[2]) || 1;
  const totalPages = data[4];
 console.log("this page à tourner", currentPage)


  const handlePageChange = (page) => {
    onPaginate(page);
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    
    handlePageChange(totalPages);
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
            className={`button ${currentPage === page ? 'active' : ''}`}
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
      <div className="pagination-container">
        <button className={`button ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
        > ⇐
        </button>
        {renderPageButtons()}
        <button className={`button ${currentPage === data[4] ? 'active' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
        > ⇒
        </button>
        </div>
      </>
   
  );
};

export default Pagination;
