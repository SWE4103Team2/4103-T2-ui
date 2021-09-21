import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from './Route.js';
import {
  ROUTE_HOME,
  ROUTE_PAGE, //For Example
} from '../../config/routes.js';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTE_HOME}>
          <p> Hello </p> {/* Here we would put containers */}
        </Route>
        <Route exact path={ROUTE_PAGE}>
          <p> Hi </p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;