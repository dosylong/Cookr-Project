import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import HomePage from './pages/index'

export default function Home() {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route exact path={match.url} component={HomePage} />
    </Switch>
  )
}
