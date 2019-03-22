import React, { Component } from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";

Amplify.configure(awsmobile);

class App extends Component {
  state = {
    message: "",
    conversation: []
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
    console.log("query called");
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
    const newPost = await API.graphql(
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

  render() {
    return (
      <div className="App">
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
        <div className="Friend-Box">Friend List</div>
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
export default withAuthenticator(App, true);
