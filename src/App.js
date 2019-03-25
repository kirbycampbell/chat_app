import React, { Component } from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsmobile from "./aws-exports";
//import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";
import NavBar from "./NavBar";
import { FriendBox } from "./FriendBox";
import { TypeBox } from "./TypeBox";

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

  subscription = API.graphql(
    graphqlOperation(subscriptions.onCreateUser)
  ).subscribe({
    next: newUser =>
      this.setState(prevState => ({
        users: [...prevState.users, newUser.value.data.onCreateUser]
      }))
  });

  query = async () => {
    let allPosts = await API.graphql(
      graphqlOperation(queries.listPosts, { limit: 100 })
    );
    console.log(allPosts);
    let thread = allPosts.data.listPosts.items;
    let sortedThread = thread.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    this.setState({
      conversation: sortedThread
    });
    let allUsers = await API.graphql(
      graphqlOperation(queries.listUsers, { limit: 10 })
    );
    console.log(allUsers);
    this.setState({
      users: allUsers.data.listUsers.items
    });
  };

  typing = event => {
    this.setState({
      message: event.target.value
    });
  };

  mutate = async () => {
    const postDeets = {
      title: "Msg1",
      body: this.state.message,
      createdAt: ""
    };
    await API.graphql(
      graphqlOperation(mutations.createPost, { input: postDeets })
    );
    this.setState({ message: "" });
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.query();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  setConvo = () => {};

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="Chat-Box">
          {this.state.conversation.map(convo => {
            return (
              <p className="text-boxes" key={convo.id}>
                {convo.body}
              </p>
            );
          })}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>

        <FriendBox users={this.state.users} setConvo={this.setConvo} />
        <TypeBox message={this.state.message} typing={this.typing} />
        <div className="sendBar">
          <button className="send-btn" onClick={this.mutate}>
            Send
          </button>
        </div>
      </div>
    );
  }
}
export default App;
