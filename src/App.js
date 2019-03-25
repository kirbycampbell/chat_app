import React, { useState } from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
//import * as subscriptions from "../graphql/subscriptions";
import awsmobile from "./aws-exports";
import NavBar from "./Components/NavBar";
import { FriendBox } from "./Components/FriendBox";
import { TypeBox } from "./Components/TypeBox";
import { ChatBox } from "./Components/ChatBox";
import { SignUp } from "./Components/SignUp";

Amplify.configure(awsmobile);

// OuterMost Layer for the App Management
const App = () => {
  const [signUp, setSignUp] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState([]);
  // TODO:::::::::::::::::::::::::::::
  // Set Convo will be for connecting the logged in user-
  // to the chat window of the user id chosen.
  const setConvo = id => {
    console.log(id);
  };

  const handleUserSignUp = () => {
    setSignUp(!signUp);
  };

  // AUTHORIZING USER BELOW
  const authUser = user => {
    console.log(user);
    // Query DB for USER
    // const queryUsers = async () => {
    //   const findUser = await API.graphql(
    //     graphqlOperation(queries.listUsers, {
    //       filter: { name: { eq: user.name } }
    //     })
    //   );
    //   console.log(findUser.data.listUsers.items);
    // };
    //queryUsers();
    setAuth(true);
    setSignUp(false);
    setUser(user);
  };

  const searchUser = async () => {
    console.log("search user called");
    const findUser = await API.graphql(
      graphqlOperation(queries.listUsers, {
        filter: { name: { contains: "StinkyButt" } }
      })
    );
    console.log(findUser);
  };

  // This is where the entire app comes together....
  return (
    <div className="App">
      <NavBar
        handleUserSignUp={handleUserSignUp}
        render={signUp}
        auth={auth}
        user={user}
      />
      <button onClick={searchUser}>Search user</button>
      <SignUp
        authUser={authUser}
        render={signUp}
        handleUserSignUp={handleUserSignUp}
      />
      <ChatBox auth={auth} />
      <FriendBox setConvo={setConvo} auth={auth} />
      <TypeBox />
    </div>
  );
};
export default App;
