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
  state = {
    message: "",
    conversation: [],
    users: []
  };

  subscription = API.graphql(
    graphqlOperation(subscriptions.onCreatePost)
  ).subscribe({
    next: newPost =>
      this.setState(prevState => ({
        conversation: [
          ...prevState.conversation,
          newPost.value.data.onCreatePost
        ]
      }))
  });

  query = async () => {
    let allPosts = await API.graphql(
      graphqlOperation(queries.listPosts, { limit: 100 })
    );
    let thread = allPosts.data.listPosts.items;
    let sortedThread = thread.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    this.setState({
      conversation: sortedThread
    });
  };

  componentDidMount() {
    this.query();
  }

  setConvo = id => {
    console.log(id);
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <ChatBox conversation={this.state.conversation} />
        <FriendBox users={this.state.users} setConvo={this.setConvo} />
        <TypeBox
          message={this.state.message}
          typing={this.typing}
          mutate={this.mutate}
        />
      </div>
    );
  }
}
export default App;
