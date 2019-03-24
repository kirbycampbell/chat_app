import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";

class NavBar extends Component {
  state = {
    username: "",
    password: "",
    iAm: ""
  };

  handleUserSignUp = async () => {
    const userDeets = {
      name: this.state.username,
      password: this.state.password,
      createdAt: ""
    };
    await API.graphql(
      graphqlOperation(mutations.createUser, { input: userDeets })
    );
    this.setState({
      username: "",
      password: "",
      iAm: userDeets.name
    });
  };

  handleTyping = event => {
    let content = event.target.value;
    let item = event.target.name;
    this.setState({
      [item]: content
    });
  };
  render() {
    return (
      <div className="NavBar">
        <input
          name="username"
          placeholder="UserName"
          onChange={this.handleTyping}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={this.handleTyping}
        />
        <button
          type="submit"
          className="navitem1"
          onClick={this.handleUserSignUp}
        >
          Sign Up
        </button>
      </div>
    );
  }
}

export default NavBar;
