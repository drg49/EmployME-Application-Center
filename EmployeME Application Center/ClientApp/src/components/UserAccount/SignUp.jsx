import React from 'react';
import * as api from '../../api/authentication';
import * as toastMethods from '../Toasts/toastMethods';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const moment = require('moment');
const spinner = <><FontAwesomeIcon icon={faSpinner} color="white" spin />{" "}</>;

export default function SignUp({ setPageState, setGlobalState }) {
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, preventSpace] = React.useState();

  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const userRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const birthdayRef = React.useRef();

  const registerUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formattedBirthday = moment(birthdayRef.current.value).format("MMM Do YYYY");
    const userInfo = {
      firstName: firstNameRef.current.value.trim(),
      lastName: lastNameRef.current.value.trim(),
      username: userRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value,
      birthday: formattedBirthday
    }
    api.signUp(userInfo)
      .then((response) => {
        if (response.ok) {
          api.login({
            username: userRef.current.value,
            email: "",
            password: passwordRef.current.value
          }).then(() => {
            api.validateUser()
              .then((data) => {
                setIsLoading(false);
                setGlobalState({ userInfo: data, isLoggedIn: true})
                history.push("/")
              })
              .catch(() => {
                setIsLoading(false);
                toastMethods.notifyError("Error during login process")
              })
          })
        }
        else {
          response.text().then((message) => {
            message ? toastMethods.notifyError(message.replace(/['"]+/g, '')) : toastMethods.notifyError("There was an issue registering your accont")
            setIsLoading(false);
          })
        }
      });
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form id="auth-box" onSubmit={registerUser}>
        <input
          type="text"
          maxLength={50}
          ref={firstNameRef}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          maxLength={50}
          ref={lastNameRef}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          maxLength={15}
          ref={userRef}
          placeholder="Username"
          required
        />
        <input 
          type="email"
          maxLength={254}
          ref={emailRef}
          placeholder="Email"
          required
        />
        <input
          type="password"
          maxLength={100}
          ref={passwordRef}
          placeholder="Password"
          value={password}
          onChange={(e) => preventSpace(e.target.value.trim())}
          required
        />
        <label htmlFor="birthday">Date of Birth</label>
        <input
          type="date"
          id="birthday"
          ref={birthdayRef}
          required
        />
        <button
          disabled={isLoading}
          id="sign-up-btn"
        >
          {isLoading && spinner}
          Sign Up
        </button>
        <span
          onClick={() => setPageState("login")}
        >
          Login
        </span>
      </form>
    </>
  )
}