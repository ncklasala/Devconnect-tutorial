import React from "react";
import spinner from "./spinner.gif";
export default function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        stlye={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
}
