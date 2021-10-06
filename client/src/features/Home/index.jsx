import React from 'react'
import { useRouteMatch } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/index'

export default function Home() {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route exact path={match.url} component={HomePage} />
    </Switch>
  )
}
