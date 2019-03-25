import React from "react";

import "../Css/NavBar.css";

const NavBar = props => {
  return (
    <div className="NavBar">
      <div>Chat App</div>
      <button
        type="button"
        className="navitem1"
        onClick={props.handleUserSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};

export default NavBar;
