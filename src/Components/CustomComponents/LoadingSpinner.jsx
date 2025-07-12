import React from "react";
import { BallTriangle } from "react-loader-spinner";

/**
 * A reusable loading spinner component centered on the page.
 */
export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
