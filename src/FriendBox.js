import React from "react";

export const FriendBox = props => {
  return (
    <div className="Friend-Box">
      {props.users.map(user => (
        <div onClick={props.setConvo} className="friend" key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  );
};
