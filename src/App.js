import React, { Component } from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsmobile from "./aws-exports";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";
import NavBar from "./NavBar";
import { FriendBox } from "./FriendBox";
import { TypeBox } from "./Components/TypeBox";
import { ChatBox } from "./ChatBox";

Amplify.configure(awsmobile);

class App extends Component {
  state = {};

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
