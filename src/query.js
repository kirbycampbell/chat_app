import { useState } from "react";
import * as queries from "./graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export const query = queryVar => {
  const [users, setUsers] = useState("");
  const [convo, setConvo] = useState([]);

  let allPosts = API.graphql(
    graphqlOperation(queries.listPosts, { limit: 100 })
  );
  let thread = allPosts.data.listPosts.items;
  let sortedThread = thread.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  setConvo(sortedThread);
  let allUsers = API.graphql(
    graphqlOperation(queries.listUsers, { limit: 10 })
  );
  setUsers(allUsers.data.listUsers.items);

  return [users, convo];
};

//     let allPosts = API.graphql(
//     graphqlOperation(queries.listPosts, { limit: 100 })
//   );
//   let thread = allPosts.data.listPosts.items;
//   let sortedThread = thread.sort((a, b) => {
//     return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//   });

//   setConvo(sortedThread);
//   let allUsers = API.graphql(
//     graphqlOperation(queries.listUsers, { limit: 10 })
//   );
//   setUsers(allUsers.data.listUsers.items);
