import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";

export default function NavBar() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [iAm, setIAm] = useState("");

  // handleUserSignUp grabs state and mutates DB with createUser
  const handleUserSignUp = async () => {
    // Takes state and makes userDeets
    let newUser = {
      name: username,
      password: password,
      createdAt: ""
    };
    await API.graphql(
      graphqlOperation(mutations.createUser, { input: newUser })
    );

    // Resets Forms
    setUsername("");
    setPassword("");
    // Sets User as logged in : MOVE THIS ::: TODO ::::
    setIAm(newUser.name);
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

  return (
    <div className="NavBar">
      <input name="username" placeholder="UserName" onChange={handleTyping} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleTyping}
      />
      <button type="submit" className="navitem1" onClick={handleUserSignUp}>
        Sign Up
      </button>
    </div>
  );
}
