import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LogIn'

export default function Auth() {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route exact path={match.url} component={LoginPage} />
      <Route path={`${match.url}/login`} component={LoginPage} />
    </Switch>
  )
}
