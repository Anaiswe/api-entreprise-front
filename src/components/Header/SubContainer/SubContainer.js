import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "./subcontainer.css";
//images 



const SubContainer = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="sub-container">
      <div className="home-btn">
      <FontAwesomeIcon 
         icon={faHouse} 
         size="xl"
         onClick={() => {
          navigate("/")
         }}/>
      </div>
    </div>
    </>
  );
};
export default SubContainer;
