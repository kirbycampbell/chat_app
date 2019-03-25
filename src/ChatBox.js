import React, { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

export const ChatBox = props => {
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    queryMsgs();
    subscriptionMsgs();
  }, []);

  const queryMsgs = async () => {
    const allMsgs = await API.graphql(
      graphqlOperation(queries.listPosts, { limit: 100 })
    );
    const sortedMsgs = allMsgs.data.listPosts.items.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    setConversation(sortedMsgs);
  };

  const subscriptionMsgs = () => {
    API.graphql(graphqlOperation(subscriptions.onCreatePost)).subscribe({
      next: newMsgData => {
        const newMsg = newMsgData.value.data.onCreatePost;
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
