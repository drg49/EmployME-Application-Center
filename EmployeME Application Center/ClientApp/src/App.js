import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/Home';
import JobApplication from './components/JobApplication';
import SearchPage from './components/SearchPage';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import UserAccount from './components/UserAccount';
import Toast from './components/Toasts';
import * as api from './api/authentication';
import './index.css'
import { useHistory } from 'react-router-dom';

export const GlobalCtx = React.createContext(null)

export default function App() {
  const history = useHistory(); 

  const [globalState, setGlobalState] = React.useState({
    userInformation: {},
    isLoggedIn: false
  });

  // Remove this useEffect here and instead place it in <Home />
  React.useEffect(() => {
    api.validateUser()
      .then((data) => {
        console.log(data)
        setGlobalState({ ...globalState, isLoggedIn: true })
      })
      .catch(() => setGlobalState({ ...globalState, isLoggedIn: false }))
  },[]) 

  return (
    <GlobalCtx.Provider value = {{globalState, setGlobalState}}>
      <main>
        <NavBar />
        <Switch>
          <Route exact path="/" 
                render={(rp) =>  <Home {...rp}/>} 
          />
          <Route path="/app/:company/:jobKey" 
            render={(rp) => <JobApplication {...rp} />} 
          />
          <Route path="/search/:jobTitle/:jobLocation" render={(rp) => <SearchPage {...rp} />} />
          <Route path="/search" render={(rp) => <SearchPage {...rp} />} />
          <Route path="/my-profile" render={(rp) => <UserAccount {...rp}/>} />
          <Route path='*' render={(rp) =>  <NotFound {...rp}/>} />
        </Switch>
      </main>
      <Toast />
    </GlobalCtx.Provider>
  );
}
