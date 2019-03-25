import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

export const ChatBox = props => {
  const [conversation, setConversation] = useState([]);

  // useEffect Queries for Messages, and subscribes to new Msgs.
  useEffect(() => {
    queryMsgs();
    subscriptionMsgs();
  }, []);

  // queryMsgs queries the DB for all Msgs
  const queryMsgs = async () => {
    const allMsgs = await API.graphql(
      graphqlOperation(queries.listPosts, { limit: 100 })
    );
    // sortedMsgs puts the newest message at the bottom of the chatBox
    const sortedMsgs = allMsgs.data.listPosts.items.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    setConversation(sortedMsgs);
  };

  // subscriptionMsgs sets a subscription to newMsgs, and updates conversation array.
  const subscriptionMsgs = () => {
    API.graphql(graphqlOperation(subscriptions.onCreatePost)).subscribe({
      next: newMsgData => {
        // newMsg breaks db return down to normal data
        const newMsg = newMsgData.value.data.onCreatePost;

        // setConversation using prevState is done like this
        setConversation(prevConversation => {
          const updatedConvo = [...prevConversation, newMsg];
          return updatedConvo;
        });
      }
    });
  };

  return (
    <div className="Chat-Box">
      {conversation.map(convo => {
        return (
          <p className="text-boxes" key={convo.id}>
            {convo.body}
          </p>
        );
      })}
      <div style={{ float: "left", clear: "both" }} />
    </div>
  );
};
