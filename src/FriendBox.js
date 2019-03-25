import React, { useState, useEffect } from "react";
import * as queries from "./graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export const FriendBox = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    queryUsers();
  }, []);

  const queryUsers = async () => {
    let allUsers = await API.graphql(
      graphqlOperation(queries.listUsers, { limit: 20 })
    );
    setUsers(allUsers.data.listUsers.items);
  };

  return (
    <div className="Friend-Box">
      {users.map(user => (
        <div
          className="usr-btn friend"
          onClick={() => props.setConvo(user.id)}
          key={user.id}
          value={user.id}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};
