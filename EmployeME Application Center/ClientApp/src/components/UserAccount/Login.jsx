import React from 'react';
import * as api from '../../api/authentication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const spinner = <><FontAwesomeIcon icon={faSpinner} color="white" spin />{" "}</>

export default function Login({ setPageState}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const userRef = React.useRef();
  const passwordRef = React.useRef();

  let loginParams = {};
  const loginUser = () => {
    if (!userRef.current.value || !passwordRef.current.value) {
      return;
    }
    setIsLoading(true);
    if (userRef.current.value.includes("@")) {
      loginParams = {
        username: "",
        email: userRef.current.value,
        password: passwordRef.current.value
      }
    }
    else {
      loginParams = {
        username: userRef.current.value,
        email: "",
        password: passwordRef.current.value
      }
    }
    api.login(loginParams)
      .then(() => {
        console.log('User logged in successfully');
        setIsLoading(false);
      })
      .catch(() => {
        console.error('The user could not login')
        setIsLoading(false);
      })
  }

  return (
    <>
      <h1>Login</h1>
      <section id="auth-box">
        <input type="text" maxLength={254} ref={userRef} placeholder="Username or Email" />
        <input type="password" maxLength={100} ref={passwordRef} placeholder="Password" />
        <button
          disabled={isLoading}
          onClick={loginUser}
          id="login-btn"
        >
          {isLoading && spinner}
          Login
        </button>
        <span
          onClick={() => setPageState("signup")}
        >
          Create an account
        </span>
      </section>
    </>
  )
}
