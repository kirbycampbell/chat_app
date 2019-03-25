import React from "react";
import { SendBar } from "./SendBar";
import "./App.css";

export const TypeBox = props => {
  return (
    <div>
      <div className="Type-Box">
        <textarea
          className="txtarea"
          placeholder="type here"
          value={props.message}
          onChange={props.typing}
        />
      </div>

      <SendBar mutate={props.mutate} />
    </div>
  );
};
