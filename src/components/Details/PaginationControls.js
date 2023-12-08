// PaginationControls.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import "./paginationControls.css"

const PaginationControls = ({ currentPage, totalPages, setCurrentPage, theme }) => {


  const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="pagination-controls">
      <div onClick={handlePrevClick} disabled={currentPage === 1}>
        <span className="btn-page">
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
      </div>
      <span>
        Page {currentPage} sur {totalPages}
      </span>
      <div onClick={handleNextClick} disabled={currentPage === totalPages}>
        <span className="btn-page">
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
    </div>
  );
};

export default PaginationControls;
