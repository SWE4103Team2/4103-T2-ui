import React, { useEffect, useState } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { Route } from './Route.js';
import { Home } from '../../containers/Home.js';
import { Login } from '../../containers/Login.js';
import { Students } from '../../containers/Students.js';
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_STUDENTS
} from '../../config/routes.js';

const Router = () => {
  const history = useHistory();
  const [user, setUser] = useState(0); // We can pass this to route -> sidebar to alter what users see.

  useEffect(() => {
    if (user === 0) {
      history.push(ROUTE_LOGIN);
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Switch>
      <Route exact path={ROUTE_HOME} user={user}>
        <Home user={user} />
      </Route>
      <Route exact path={ROUTE_LOGIN}>
        <Login setUser={setUser} />
      </Route>
      <Route exact path={ROUTE_STUDENTS} user={user}>
        <Students />
      </Route>
    </Switch>
  );
}

export default Router;