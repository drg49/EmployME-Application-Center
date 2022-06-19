import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { GlobalCtx } from '../../App';

import './index.scss';

export default function UserAccount() {
  const [pageState, setPageState] = React.useState("default");

  const { globalState, setGlobalState } = React.useContext(GlobalCtx)

  const loggedOutUI = () => (
    <>
      {pageState === "default" ? (
      <>
        <h1>Your Journey Starts Here</h1>
        <button onClick={() => setPageState("login")} id="login-btn">Login</button>
        <button onClick={() => setPageState("signup")}id="sign-up-btn">Sign up</button>
      </>
      ) : null}
      {pageState === "login" ? <Login setPageState={setPageState} setGlobalState={setGlobalState} /> : null}
      {pageState === "signup" ? <SignUp setPageState={setPageState} setGlobalState={setGlobalState} /> : null}
    </>
  )
  
  const loggedInUI = () => (
    <>
      There is something here
    </>
  )

  return (
    <>
      {globalState.isLoggedIn === null && <>Loading</>}
      {globalState.isLoggedIn === false && loggedOutUI()}
      {globalState.isLoggedIn && loggedInUI()}
    </>
  )
}
