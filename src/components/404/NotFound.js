import React from "react";

const NotFound = () => {
  return (
    <div className="not-found d-flex flex-column justify-content-center align-items-center">
      <h1 className="not-found__header--primary mb-3">404</h1>
      <h2 className="not-found__header--secondary mb-5">PAGE NOT FOUND</h2>
      <p className="not-found__paragraph">
        The page you are looking for might been removed,
        <br /> had its name changed or is temporarily unavailable.
      </p>
    </div>
  );
};

export default NotFound;
