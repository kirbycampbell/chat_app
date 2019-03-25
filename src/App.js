import React, { Component } from "react";
import "./App.css";
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
import NavBar from "./NavBar";
import { FriendBox } from "./FriendBox";
import { TypeBox } from "./Components/TypeBox";
import { ChatBox } from "./ChatBox";

Amplify.configure(awsmobile);

// OuterMost Layer for the App Management
const App = () => {
  // TODO:::::::::::::::::::::::::::::
  // Set Convo will be for connecting the logged in user-
  // to the chat window of the user id chosen.
  const setConvo = id => {
    console.log(id);
  };

  // This is where the entire app comes together....
  return (
    <div className="App">
      <NavBar />
      <ChatBox />
      <FriendBox setConvo={setConvo} />
      <TypeBox />
    </div>
  );
};
export default App;
