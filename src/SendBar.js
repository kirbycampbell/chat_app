import React from "react";

export const SendBar = props => {
  return (
    <div className="sendBar">
      <button className="send-btn" onClick={props.mutate}>
        Send
      </button>
    </div>
  );
};
