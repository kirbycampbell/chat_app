import React from "react";

import "../Css/NavBar.css";

const NavBar = props => {
  return (
    <div className="NavBar">
      <div className="logo">Chatterson - The App</div>
      {!props.render && !props.auth && (
        <button
          type="button"
          className="navitem1"
          onClick={props.handleUserSignUp}
        >
          Sign Up
        </button>
      )}
      {props.auth && <p className="welcome">{props.user.name}'s Chat Page</p>}
    </div>
  );
};

export default NavBar;
