import Loader from "../Images/loading.gif";
import React from "react";
import "../../App.css"; // Import CSS file for styling

export default function Spinner() {
  return (
    <div className="flex justify-center items-center">
      {" "}
      {/* Add a className for styling */}
      <img src={Loader} alt="Loading..." />{" "}
      {/* Add alt text for accessibility */}
    </div>
  );
}
