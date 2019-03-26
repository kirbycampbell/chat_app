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
var bcrypt = require("bcryptjs");
//var salt = bcrypt.genSaltSync(10);
//var hash = bcrypt.hashSync("B4c0//", salt);

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
    // Query DB for USER
    const searchUser = async () => {
      const findUser = await API.graphql(
        graphqlOperation(queries.listUsers, {
          limit: 200,
          filter: { name: { eq: user.name } }
        })
      );
      const signedInUser = findUser.data.listUsers.items[0];
      if (
        signedInUser.name === user.name &&
        signedInUser.password === user.password
      ) {
        setUser(signedInUser);
        setAuth(true);
        setSignUp(false);
        console.log("Signup Successful");
      } else {
        console.log("Sign Up Failed");
      }
    };
    searchUser();
  };

  // Testing Password Salting & Hashing w Bcrypt

  // Test Function for making password Hash
  const makePWD = () => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash("passwordTest123", salt, function(err, hash) {
        console.log(hash);
      });
    });
  };
  // Fake DB Save of hash created above
  const hashedmr =
    "$2a$10$T11M0zKZJhUuUIdxiTJ5S.o5n0.4/nZVHxpEvVBGctQMwUgl69iYG";

  // Test Function for comparing password hashes - correct password is sent in on btn
  const checkPWD = myPW => {
    bcrypt.compare(myPW, hashedmr).then(isMatch => {
      if (isMatch) {
        console.log("isMatched");
      } else {
        console.log("NOT MATCHED");
      }
    });
  };
  return (
    <div className="App">
      <NavBar
        handleUserSignUp={handleUserSignUp}
        render={signUp}
        auth={auth}
        user={user}
      />
      <button onClick={makePWD}>Make Password</button>
      <button onClick={() => checkPWD("passwordTest123")}>
        Check Password
      </button>
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
