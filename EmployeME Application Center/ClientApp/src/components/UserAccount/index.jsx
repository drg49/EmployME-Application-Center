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
        <button onClick={() => setPageState("login")}>Login</button>
        <button onClick={() => setPageState("signup")}>Sign up</button>
      </>
      ) : null}
      {pageState === "login" ? <Login /> : null}
      {pageState === "signup" ? <SignUp /> : null}
    </>
  )
}