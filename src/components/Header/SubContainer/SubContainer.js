import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "./subcontainer.css";
const SubContainer = () => {
  const navigate = useNavigate();

  return (
    <>
    <div class="sub-container mt-5">
  <div class="row justify-content-space-around">
  <div class="col">
      <button className = "btn"
         onClick={() => {
          navigate("/")
         }}>  <FontAwesomeIcon 
         icon={faHouse} 
         size="xl"/></button>
    </div>
    <div class="col">
    <button className = "btn"
         onClick={() => {
          navigate("/test")
         }}>My Test page</button>
    </div>
  </div>
</div>
    </>
  );
};
export default SubContainer;
