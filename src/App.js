import React, { useState } from "react";
import "./App.css";
import Amplify from "aws-amplify";
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
  // TODO:::::::::::::::::::::::::::::
  // Set Convo will be for connecting the logged in user-
  // to the chat window of the user id chosen.
  const setConvo = id => {
    console.log(id);
  };

  const handleUserSignUp = () => {
    setSignUp(!signUp);
  };

  const authUser = user => {
    console.log(user);
  };
  // This is where the entire app comes together....
  return (
    <div className="App">
      <NavBar handleUserSignUp={handleUserSignUp} render={signUp} />
      <SignUp
        authUser={authUser}
        render={signUp}
        handleUserSignUp={handleUserSignUp}
      />
      <ChatBox render={signUp} />
      <FriendBox setConvo={setConvo} render={signUp} />
      <TypeBox />
    </div>
  );
};
export default App;
