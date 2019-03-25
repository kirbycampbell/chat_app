import React from "react";

export const ChatBox = props => {
  return (
    <div className="Chat-Box">
      {props.conversation.map(convo => {
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
