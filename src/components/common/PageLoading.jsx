import React from "react";
import "@/assets/styles/componentStyle/catLoader.scss";

const isLoading = false;

const PageLoading = () => {
  return isLoading ? (
    <div
      className="d-flex flex-column justify-content-center align-items-center position-fixed"
      style={{
        inset: 0,
        backgroundColor: "#4444",
        zIndex: 100,
      }}
    >
      <div className="cat-loader cat3" style={{ width: 200 }}>
        <div className="cat__body"></div>
        <div className="cat__body"></div>
        <div className="cat__body"></div>
        <div className="cat__tail"></div>
        <div className="cat__head"></div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PageLoading;
