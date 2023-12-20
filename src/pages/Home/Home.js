import React,  {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

// Components
import SearchHome from "../../components/SearchContainer/SearchHome/SearchHome";
import FetchScrapedData from "../../functions/FetchScrapedData";

// Styles
import "./home.css";

const Home = ({ theme }) => {

  const [isConventionHovered, setIsConventionHovered] = useState(false);
  const [isAgreementHovered, setIsAgreementHovered] = useState(false);
  const [isIndexHovered, setIsIndexHovered] = useState(false);
  const { conventionData, agreementData, egaproData } = FetchScrapedData();

  // const handleHoverConvention = () => {
  //   setIsConventionHovered(!isConventionHovered);
  // };

  // const handleHoverAgreement = () => {
  //   setIsAgreementHovered(!isAgreementHovered);
  // };

  // const handleHoverIndex =  () => {
  //   setIsIndexHovered(!isIndexHovered)
  // }


  const handleClickConvention = () => {
    setIsConventionHovered(!isConventionHovered);
  };

  const handleClickAgreement = () => {
    setIsAgreementHovered(!isAgreementHovered);
  };

  const handleClickIndex = () => {
    setIsIndexHovered(!isIndexHovered);
  };

  // console.log (conventionData.text)

  return (
    <>
      <div className="home-container">
        <div className="home-search-engine">
          <SearchHome theme={theme} />
        </div>
        <div className="home-text">
          Recherchez une entreprise, puis accédez en quelques clics aux textes qui lui sont applicables et répertoriés sur {" "}
          <a className="home-link" href="https://www.legifrance.gouv.fr/" target="_blank" rel="noopener noreferrer">
            Légifrance
            <span className="icon-link">
              <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" />
            </span>
          </a> : <br />
          <div className="bullet-point">
            <span className="convention"
            //  onMouseEnter={handleHoverConvention}
            //  onMouseLeave={handleHoverConvention}
             onClick={handleClickConvention}>
                convention collective
                {isConventionHovered && (
              <div className="convention-info">
                <p>{conventionData.text}</p>
                <p>Source: {conventionData.source}</p>
              </div>
            )}
            </span>

            <span className="accords-entreprise"
            //  onMouseEnter={handleHoverAgreement}
            //  onMouseLeave={handleHoverAgreement}
             onClick={handleClickAgreement}>
               accords d'entreprise
               {isAgreementHovered && (
              <div className="convention-info">
                 <p>{agreementData.text}</p>
                <p>Source: {agreementData.source}</p>
              </div>
            )}
            </span>

            <span className="egalite-pro"
            // onMouseEnter={handleHoverIndex}
            // onMouseLeave={handleHoverIndex} 
            onClick={handleClickIndex}>
              index égalité professionnelle
              {isIndexHovered && (
              <div className="convention-info">
                 <p>{egaproData.text}</p>
                <p>Source: {egaproData.source}</p>
              </div>
            )}
            </span>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
