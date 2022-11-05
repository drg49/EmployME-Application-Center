import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import LoggedInUI from './LoggedInUI';
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
  const { userInfo } = globalState;

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
  
  React.useEffect(() => console.log(userInfo), [userInfo]) //

  return (
    <>
      {globalState.isLoggedIn === null && spinner}
      {globalState.isLoggedIn === false && loggedOutUI()}
      {globalState.isLoggedIn && <LoggedInUI userInfo={userInfo} logoutBtn={logOutButton()} />}
    </>
  )
}
