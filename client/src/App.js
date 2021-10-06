import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './layouts/Main';
import LoginPage from './features/Auth/index';
import HomePage from './features/Home/index';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={'/'} component={MainPage} />
          <Route path={'/login'} component={LoginPage} />
          <Route path={'/home'} component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
