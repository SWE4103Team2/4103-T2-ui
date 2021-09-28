import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from './Route.js';
import { Home } from '../../containers/Home.js';
import { ExamplePage } from '../../containers/ExamplePage.js';
import { Students } from '../../containers/Students.js';
import {
  ROUTE_HOME,
  ROUTE_STUDENTS,
  ROUTE_EXAMPLE, //For Example
} from '../../config/routes.js';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTE_HOME}>
          <Home />
        </Route>
        <Route exact path={ROUTE_EXAMPLE}>
          <ExamplePage />
        </Route>
        <Route exact path={ROUTE_STUDENTS}>
          <Students />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;