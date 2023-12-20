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
            <div className="scrap-link">
            <span className="convention"
            //  onMouseEnter={handleHoverConvention}
            //  onMouseLeave={handleHoverConvention}
             onClick={handleClickConvention}>
                convention collective
            </span>
            <div className="scrap-info-display">
            {isConventionHovered && (
              <div className="scrap-info">
                <p>{conventionData.text}</p>
                Source:{" "}
                 <a href={conventionData.source} target="_blank" rel="noopener noreferrer">
                  {conventionData.source}
                  </a>
              </div>
            )}
            </div>
            </div>

            <div className="scrap-link">
            <span className="accords-entreprise"
            //  onMouseEnter={handleHoverConvention}
            //  onMouseLeave={handleHoverConvention}
            onClick={handleClickAgreement}>
            accords d'entreprise
            </span>
            <div className="scrap-info-display">
            {isAgreementHovered && (
              <div className="scrap-info">
                 <p>{agreementData.text}</p>
                 Source:{" "}
                 <a href={agreementData.source} target="_blank" rel="noopener noreferrer">
                  {agreementData.source}
                  </a>
              </div>
            )}
            </div>
            </div>

            <div className="scrap-link">
            <span className="egalite-pro"
            //  onMouseEnter={handleHoverConvention}
            //  onMouseLeave={handleHoverConvention}
            onClick={handleClickIndex}>
              index égalité professionnelle
            </span>
            <div className="scrap-info-display">
            {isIndexHovered && (
              <div className="scrap-info">
                 <p>{egaproData.text}</p>
                 Source:{" "}
                 <a href={egaproData.source} target="_blank" rel="noopener noreferrer">
                  {egaproData.source}
                  </a>
                
              </div>
            )}
            </div>
            </div>
 
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
