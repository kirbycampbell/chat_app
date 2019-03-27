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
import { SignIn } from "./Components/SignIn";

Amplify.configure(awsmobile);
var bcrypt = require("bcryptjs");

// OuterMost Layer for the App Management
const App = () => {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
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

  const handleUserSignIn = () => {
    setSignIn(!signIn);
  };
  // AUTHORIZING USER BELOW
  const authUser = (user, pwd) => {
    // Query DB for USER
    const searchUser = async () => {
      const findUser = await API.graphql(
        graphqlOperation(queries.listUsers, {
          limit: 200,
          filter: { name: { eq: user.name } }
        })
      );
      const signedInUser = findUser.data.listUsers.items[0];
      bcrypt.compare(pwd, signedInUser.password).then(isMatch => {
        if (isMatch && signedInUser.name === user.name) {
          console.log("AUTHORIZED");
          setUser(signedInUser);
          setAuth(true);
          setSignUp(false);
          console.log("Signup Successful");
        } else if (!isMatch && signedInUser.name === user.name) {
          console.log("Password INCORRECT!");
        } else {
          console.log("NOT MATCHED");
        }
      });
    };
    searchUser();
  };

  return (
    <div className="App">
      <NavBar
        handleUserSignUp={handleUserSignUp}
        handleUserSignIn={handleUserSignIn}
        render={signUp}
        renderIn={signIn}
        auth={auth}
        user={user}
      />
      <SignUp
        authUser={authUser}
        render={signUp}
        handleUserSignUp={handleUserSignUp}
      />
      <SignIn
        authUser={authUser}
        render={signIn}
        handleUserSignIn={handleUserSignIn}
      />
      <ChatBox auth={auth} />
      <FriendBox setConvo={setConvo} auth={auth} />
      <TypeBox />
    </div>
  );
};
export default App;
