import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

import './index.scss';

export default function UserAccount() {
  const [pageState, setPageState] = React.useState("default");

  return (
    <>
      {pageState === "default" ? (
      <>
        <h1>Your Journey Starts Here</h1>
        <button onClick={() => setPageState("login")} id="login-btn">Login</button>
        <button onClick={() => setPageState("signup")}id="sign-up-btn">Sign up</button>
      </>
      ) : null}
      {pageState === "login" ? <Login setPageState={setPageState} /> : null}
      {pageState === "signup" ? <SignUp setPageState={setPageState} /> : null}
    </>
  )
}