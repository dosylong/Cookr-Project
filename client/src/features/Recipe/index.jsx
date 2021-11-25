import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import CreateRecipePage from './pages/CreateRecipePage';

export default function Profile() {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.url}/create`} component={CreateRecipePage} />
      </Switch>
    </div>
  );
}
