import React from 'react';
import Dashboard from 'pages/Dashboard';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFoundPage from 'pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path='/app'>
        <Dashboard />
      </Route>
      <Route exact path='/'>
        <Redirect to='/app' />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default Routes;
