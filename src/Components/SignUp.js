import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import "../Css/SignUp.css";
import useInterval from "./../useInterval";
var bcrypt = require("bcryptjs");

export const SignUp = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(null);
  const [hashPass, setHashPass] = useState("");
  const [hashTimer, setHashTimer] = useState(false);
  const [count, setCount] = useState(0);

  useInterval(() => {
    if (hashTimer && count >= 0.5) {
      setHashTimer(false);
      addNewUser();
    } else if (hashTimer && count < 0.5) {
      setCount(count + 1);
      console.log(count);
    }
  }, 1000);

  // handleUserSignUp grabs state and mutates DB with createUser
  const handleUserSignUp = () => {
    setHashTimer(true);
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        setHashPass(hash);
        console.log("Make Password Hash:");
        console.log(hash);
      });
    });
  };

  const addNewUser = async () => {
    let newUser = {
      name: username,
      password: hashPass,
      createdAt: ""
    };
    // Takes state and makes userDeets
    console.log("Add new User Called");
    console.log(newUser);
    await API.graphql(
      graphqlOperation(mutations.createUser, { input: newUser })
    );

    // Sets User as logged in
    props.authUser(newUser, password);
    // Resets Forms
    setUsername("");
    setPassword("");
  };

  // Function handles userName & Password forms & assigns to state
  const handleTyping = event => {
    let content = event.target.value;
    let item = event.target.name;
    if (item === "username") {
      setUsername(content);
    } else if (item === "password") {
      setPassword(content);
    }
  };
  if (props.render) {
    return (
      <div className="sign-up-form">
        <input name="username" placeholder="UserName" onChange={handleTyping} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleTyping}
        />
        <button
          type="submit"
          className="sign-up-btn"
          onClick={props.handleUserSignUp}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="sign-up-btn"
          onClick={handleUserSignUp}
        >
          Sign Up
        </button>
      </div>
    );
  } else return null;
};
