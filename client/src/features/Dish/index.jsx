import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router';
import CreateDishPage from './pages/CreateDishPage';
import DishDetailPage from './pages/DishDetailPage';

function Dish() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/create`} component={CreateDishPage} />
      <Route path={`${match.url}/:dishSlug`} component={DishDetailPage} />
    </Switch>
  );
}

export default Dish;
