import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SearchHome from "../../components/SearchContainer/SearchHome/SearchHome";
import FetchScrapedData from "../../functions/FetchScrapedData";
import "./home.css";

const Home = ({ theme }) => {
  const [scrapedDataItem, setScrapedDataItem] = useState(null);
  const { conventionData, agreementData, egaproData } = FetchScrapedData();

  const handleClick = (item) => {
    setScrapedDataItem(scrapedDataItem === item ? null : item);
  };

  return (
    <>
      <div className="home-container">
        <div className="home-search-engine">
          <SearchHome theme={theme} />
        </div>
        <div className="home-text">
          Recherchez une entreprise, puis accédez en quelques clics aux textes
          qui lui sont applicables et répertoriés sur{" "}
          <a
            className="home-link"
            href="https://www.legifrance.gouv.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Légifrance
            <span className="icon-link">
              <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" />
            </span>
          </a>{" "}
          <br />
          <div className="bullet-point">
            <div className="scrap-link">
              <span
                className={`convention ${scrapedDataItem === "convention" && "active"}`}
                onClick={() => handleClick("convention")}
              >
                convention collective
                <div className={`bubble-info scrap-info-display ${scrapedDataItem === "convention" && "active"}`}>
                  {scrapedDataItem === "convention" && (
                    <div className="scrap-info">
                      <p>{conventionData.text}</p>
                      Source:{" "}
                      <a
                        href={conventionData.source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {conventionData.source}
                      </a>
                    </div>
                  )}
                </div>
              </span>
            </div>

            <div className="scrap-link">
              <span
                className={`accords-entreprise ${scrapedDataItem === "accords-entreprise" && "active"}`}
                onClick={() => handleClick("accords-entreprise")}
              >
                accords d'entreprise
                <div className={`bubble-info scrap-info-display ${scrapedDataItem === "accords-entreprise" && "active"}`}>
                  {scrapedDataItem === "accords-entreprise" && (
                    <div className="scrap-info">
                      <p>{agreementData.text}</p>
                      Source:{" "}
                      <a
                        href={agreementData.source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {agreementData.source}
                      </a>
                    </div>
                  )}
                </div>
              </span>
            </div>

            <div className="scrap-link">
              <span
                className={`egalite-pro ${scrapedDataItem === "egalite-pro" && "active"}`}
                onClick={() => handleClick("egalite-pro")}
              >
                index égalité professionnelle
                <div className={`bubble-info scrap-info-display ${scrapedDataItem === "egalite-pro" && "active"}`}>
                  {scrapedDataItem === "egalite-pro" && (
                    <div className="scrap-info">
                      <p>{egaproData.text}</p>
                      Source:{" "}
                      <a
                        href={egaproData.source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {egaproData.source}
                      </a>
                    </div>
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
