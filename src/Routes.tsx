import React from 'react';
import Dashboard from 'pages/Dashboard';
import Ocr from 'pages/Ocr';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFoundPage from 'pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path='/admin'>
        <Dashboard />
      </Route>
      <Route exact path='/app'>
        <Ocr />
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
