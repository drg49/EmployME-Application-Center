import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/Home';
import JobApplication from './components/JobApplication';
import SearchPage from './components/SearchPage';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import UserAccount from './components/UserAccount';
import './index.css'

export default function App() {

  return (
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
  );
}
