import axios from "axios";
import { useState, useEffect } from "react";

import "../assets/styles/testPage.css"


const TestPage = () => {

  const result = []
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/test");
        //console.log("THIS RESPONSE", response.data);
        setData(response.data);
        //console.log("THIS DATA",data.results)
        setIsLoading(false);
      } catch (error) {
        //console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>Loading</span>
  ) : (
    <>
    <div>total fetch items : {[data.total_results]}</div>
    <div>page : {[data.page]}</div>
    <div>result per page : {[data.per_page]}</div>
    <div className="testPage"> TEST1 {[data.results[0].nom_complet]}
    <div className="test">
  TEST2 {data.results.map(result => result.nom_complet).join(', ')}
</div>
    </div>
   
    </>
  );
}


// return isLoading ? (
//     <span>Loading...</span>
//     ) : (  <div className="testPage">
//       TEST
//       <div className ="testPage-container">
//         <div className = "testPage-text">
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//         "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium 
//         voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, 
//         similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. 
//         Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, 
//         cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 
//         Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. 
//         Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
//         </div>
//         </div>
//       </div>)
//   );
// };
export default TestPage;
