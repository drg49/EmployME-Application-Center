import React from 'react';
import * as api from '../../api/authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const moment = require('moment');
const spinner = <><FontAwesomeIcon icon={faSpinner} color="white" spin />{" "}</>;

export default function SignUp({ setPageState }) {
  const [isLoading, setIsLoading] = React.useState(false);

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
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      username: userRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      birthday: formattedBirthday
    }
    api.signUp(userInfo)
      .then(() => {
        setIsLoading(false);
        console.log('User created successfully')
      })
      .catch((e) => {
        setIsLoading(false);
        console.log('ERROR', e);
      })
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