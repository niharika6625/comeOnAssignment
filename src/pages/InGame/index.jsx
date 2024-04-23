import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../helper/constants";

const { CASINO } = ROUTE_PATH;

const Ingame = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { code } = params;

  useEffect(() => {
    setTimeout(() => {
      window.comeon.game.launch(code);
    }, 1000);
  }, [code]);

  const handleBack = () => {
    navigate(CASINO);
  };

  return (
    <div className="ingame">
      <div className="ui grid centered">
        <div className="three wide column">
          <div
            className="ui right floated secondary button inverted"
            onClick={() => handleBack()}
          >
            <i className="left chevron icon"></i>Back
          </div>
        </div>
        <div className="ten wide column">
          <div id="game-launch"></div>
        </div>
        <div className="three wide column"></div>
      </div>
    </div>
  );
};

export default Ingame;
