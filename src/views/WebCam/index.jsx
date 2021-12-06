import React from "react";
import "./indexStyles.css";
import { WebcamCapture } from "../WebCam/webCam";

const Home = () => {
  return (
    <div className="home-container">
      <div className="container">
        <div className="text">
          <h1>Take A Photo!</h1>
          <form className="form">
            <WebcamCapture />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Home;
