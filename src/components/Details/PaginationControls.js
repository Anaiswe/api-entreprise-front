// import React from "react";

// const PaginationControls = ({ currentPage, totalPages, setCurrentPage, className }) => {
//   return (
//     <div className={`pagination-controls${className}`}>
//       <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
//         Précédent
//       </button>
//       <span>
//         Page {currentPage} sur {totalPages}
//       </span>
//       <button
//         onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//         disabled={currentPage === totalPages}
//       >
//         Suivant
//       </button>
//     </div>
//   );
// };

// export default PaginationControls;