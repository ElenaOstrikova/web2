import React from "react";

import "./Loader.css";


export default function Loader() {
  return (
    <div className="loader">
      <img src={"/loading.svg"} alt="loader" height="128" width="128" />
      <p>Data is loading...</p>
    </div>
  );
}
