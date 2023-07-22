// import { useState } from "react";
// //pkg
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// import "./searchbartest.css"



// const SearchBarTest = ({ data }) => {
  
//   //const [searchInput, setSearchInput] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const dataSuggestions = () => {
//     console.log("this data", data);
//     const currentPage = data[2];
//     const totalPages = data[4];
  
//     for (let page = currentPage; page <= totalPages; page++) {
//       // Faites quelque chose avec le data[0] de chaque page
//       // Utilisez la variable `page` pour accéder à chaque page de la data
//       const currentPageData = data[0][page - 1];
//       console.log(`Data of page ${page}:`, currentPageData, typeof currentPageData);
//     }
//   };

//   const handleInputChange = (e) => {
//     const searchValue = e.target.value.toLowerCase();
//     const filteredSuggestions = data[0]?.filter(
//       (item) =>
//         item.nom_raison_sociale.toLowerCase().includes(searchValue) ||
//         (item.sigle && item.sigle.toLowerCase().includes(searchValue))
//     );
//     setSuggestions(filteredSuggestions);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     // Do something with the selected suggestion (e.g., update search value)
//   };





//   return (
//     <div className="search-bar">
//       <input
//         className="input-search"
//         id="search-bar"
//         type="text"
//         placeholder="Search..."
//         onChange={dataSuggestions}
//       />
//       <button className="search-button">
//         <FontAwesomeIcon icon={faMagnifyingGlass} />
//       </button>
//       {suggestions.length > 0 && (
//         <ul className="suggestions">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               onClick={() => handleSuggestionClick(suggestion)}
//               className="suggestion-item"
//             >
//               {suggestion.nom_raison_sociale}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>

//   );
// };

// export default SearchBarTest;
