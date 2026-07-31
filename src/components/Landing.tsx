import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { firstName, lastName, heroRole } from "../data/site";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName}
              <br />
              <span>{lastName}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{heroRole.prefix}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{heroRole.word1}</div>
              <div className="landing-h2-2">{heroRole.word2}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{heroRole.word2}</div>
              <div className="landing-h2-info-1">{heroRole.word1}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
