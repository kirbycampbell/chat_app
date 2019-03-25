import React from "react";

export const TypeBox = props => {
  return (
    <div className="Type-Box">
      <textarea
        className="txtarea"
        placeholder="type here"
        value={props.message}
        onChange={props.typing}
      />
    </div>
  );
};
