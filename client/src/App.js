import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import MainPage from './layouts/Main';
import LoginPage from './features/Auth/index';
import HomePage from './features/Home/index';
import NotFound from './components/NotFound';

function App() {
  const [userState, setUserState] = useState('');

  useEffect(() => {
    setUserState(localStorage.getItem('account'));
  }, []);

  return (
    <div className="App">
      <Router>
        <MainPage />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          {userState !== '' && <Redirect exact from="/login" to="/" /> }
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
