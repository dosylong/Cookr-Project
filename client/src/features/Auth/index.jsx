import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import RegisterGooglePage from './pages/RegisterGooglePage';

export default function Login() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route
        path={`${match.url}/register-google`}
        component={RegisterGooglePage}
      />
      <Route path={`${match.url}/login`} component={LoginPage} />
      <Route path={`${match.url}/register`} component={RegisterPage} />
    </Switch>
  );
}
