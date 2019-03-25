import React, { useState, useEffect } from "react";
import * as queries from "./graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "./graphql/subscriptions";

export const FriendBox = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    queryUsers();
    subscription();
  }, []);

  const queryUsers = async () => {
    let allUsers = await API.graphql(
      graphqlOperation(queries.listUsers, { limit: 20 })
    );
    setUsers(allUsers.data.listUsers.items);
  };

  const subscription = () => {
    API.graphql(graphqlOperation(subscriptions.onCreateUser)).subscribe({
      next: newUser => {
        const newUsery = newUser.value.data.onCreateUser;
        setUsers(prevUsers => {
          const updatedUsers = [...prevUsers, newUsery];
          return updatedUsers;
        });
      }
    });
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
