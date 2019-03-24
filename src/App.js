import React, { Component } from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsmobile from "./aws-exports";
//import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";

Amplify.configure(awsmobile);

class App extends Component {
  state = {
    message: "",
    conversation: [],
    users: [],
    username: "",
    password: "",
    iAm: ""
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

  setConvo = () => {};

  render() {
    return (
      <div className="App">
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
        <div className="Friend-Box">
          {this.state.users.map(user => (
            <div onClick={this.setConvo} className="friend" key={user.id}>
              {user.name}
            </div>
          ))}
        </div>
        <div className="Type-Box">
          <textarea
            className="txtarea"
            placeholder="type here"
            value={this.state.message}
            onChange={this.typing}
          />
        </div>
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
