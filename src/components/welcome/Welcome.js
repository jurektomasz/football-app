import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <div className="welcome w-100 d-flex flex-column align-items-center justify-content-center p-3">
        <h1 className="welcome-txt align-self-start text-uppercase">
          get your daily
        </h1>
        <h1 className="welcome-txt align-self-end text-uppercase mb-5 pb-5">
          dose of football
        </h1>

        <Link to="/login" className="btn btn-primary my-5 py-3 px-5">
          Get Started
        </Link>
      </div>
    </>
  );
};

export default Welcome;
