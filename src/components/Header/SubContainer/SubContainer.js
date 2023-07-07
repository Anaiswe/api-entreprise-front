import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "./subcontainer.css";
//images 
import extraT from "../../../assets/images/extraT.png";


const SubContainer = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="sub-container">
      <img src={extraT} className = "extraT" alt="extraT" />
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
