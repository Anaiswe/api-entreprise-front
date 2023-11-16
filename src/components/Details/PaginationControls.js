// PaginationControls.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PaginationControls = ({ currentPage, totalPages, setCurrentPage, theme }) => {
  const className = theme === "bg-dark" ? "-dark" : "-light";

  const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className={`pagination-controls${className}`}>
      <div onClick={handlePrevClick} disabled={currentPage === 1}>
        <span className={`btn-page${className}`}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
      </div>
      <span>
        Page {currentPage} sur {totalPages}
      </span>
      <div onClick={handleNextClick} disabled={currentPage === totalPages}>
        <span className={`btn-page${className}`}>
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
    </div>
  );
};

export default PaginationControls;
