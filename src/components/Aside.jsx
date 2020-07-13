import React, { useEffect } from "react";

import User from "./User";

import "../assets/styles/Aside.styl";
import loading from "../assets/images/loading.gif";

const Aside = (props) => {
  if (props.initialState === 0 || props.initialState === undefined) {
    return (
      <div className="Aside Aside__loading">
        <img className="Aside__github" src={loading} />
        <p>Please select a User to quick view</p>
      </div>
    );
  }
  return (
    <div className="Aside">
      <User state={props} />
    </div>
  );
};

export default Aside;
