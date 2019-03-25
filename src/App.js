import React, { Component } from "react";
import "./App.css";
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
import NavBar from "./NavBar";
import { FriendBox } from "./FriendBox";
import { TypeBox } from "./Components/TypeBox";
import { ChatBox } from "./ChatBox";

Amplify.configure(awsmobile);

class App extends Component {
  state = {};

  // Set Convo will be for connecting the logged in user-
  // to the chat window of the user id chosen.
  setConvo = id => {
    console.log(id);
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <ChatBox />
        <FriendBox setConvo={this.setConvo} />
        <TypeBox />
      </div>
    );
  }
}
export default App;
