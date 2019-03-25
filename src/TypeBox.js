import React, { useState } from "react";
import { SendBar } from "./Components/SendBar";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";

export const TypeBox = props => {
  const [message, setMessage] = useState("");

  const typing = event => {
    setMessage(event.target.value);
  };

  const send = async () => {
    const postDeets = {
      title: "Msg1",
      body: message,
      createdAt: ""
    };
    await API.graphql(
      graphqlOperation(mutations.createPost, { input: postDeets })
    );
    setMessage("");
  };

  return (
    <div>
      <div className="Type-Box">
        <textarea
          className="txtarea"
          placeholder="type here"
          value={message}
          onChange={typing}
        />
      </div>

      <SendBar send={send} />
    </div>
  );
};
