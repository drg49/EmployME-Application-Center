import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { GlobalCtx } from '../../App';
import * as api from '../../api/authentication';
import * as toasts from '../Toasts/toastMethods';

import './index.scss';

const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" size="8x" style={{ 'marginTop': '20px' }} />
const btnSpinner = <><FontAwesomeIcon icon={faSpinner} color="white" spin />{" "}</>

export default function UserAccount() {
  const [pageState, setPageState] = React.useState("default");
  const [isLoading, setIsLoading] = React.useState(false);

  const { globalState, setGlobalState } = React.useContext(GlobalCtx);
  const user = globalState.userInfo;

  const loggedOutUI = () => (
    <>
      {pageState === "default" && (
      <>
        <h1>Your Journey Starts Here</h1>
        <button onClick={() => setPageState("login")} id="login-btn">Login</button>
        <button onClick={() => setPageState("signup")}id="sign-up-btn">Sign up</button>
      </>
      )}
      {pageState === "login" && <Login setPageState={setPageState} setGlobalState={setGlobalState} />}
      {pageState === "signup" && <SignUp setPageState={setPageState} setGlobalState={setGlobalState} />}
    </>
  )

  const logOutButton = () => (
    <button
      className='em-global-danger-btn'
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        api.logout()
          .then(() => {
            setIsLoading(false);
            setGlobalState({ ...globalState, isLoggedIn: false, userInfo: null });
            toasts.notifySuccess('You have been logged out')
          })
          .catch(() => {
            setIsLoading(false);
            toasts.notifyError('Failed to log out user');
          })
      }}
    >
      {isLoading && btnSpinner}
      Logout
    </button>
  )
  
  const loggedInUI = () => (
    <div id="my-profile">
      <section>
        <div>
          <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="Profile Pic" id="profile-pic" />
          <p>{user?.firstName + " " + user?.lastName}</p>
        </div>  
      {logOutButton()}
      </section>
    </div>
  )

  React.useEffect(() => console.log(user), [user]) //

  return (
    <>
      {globalState.isLoggedIn === null && spinner}
      {globalState.isLoggedIn === false && loggedOutUI()}
      {globalState.isLoggedIn && loggedInUI()}
    </>
  )
}
