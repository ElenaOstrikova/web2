import React from "react";

import "./WeatherParam.css";


export default function WeatherParam(props) {
  return (
    <div className="param">
      <div className="name">{props.name}</div>
      <div className="value">{props.value}</div>
    </div>
  );
}
