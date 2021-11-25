import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import EditProfilePage from './pages/EditProfilePage';
import ProfilePage from './pages/ProfilePage';

export default function Profile() {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.url}/:userId/edit`} component={EditProfilePage} />
        <Route path={`${match.url}/:userId`} component={ProfilePage} />
      </Switch>
    </div>
  );
}
