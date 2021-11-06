import React, { useEffect, useState } from 'react';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import { Route } from './Route.js';
import { Home } from '../../containers/Home.js';
import { Login } from '../../containers/Login.js';
import { Students } from '../../containers/Students.js';
import { FileUpload } from '../../containers/FileUpload.js'
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_STUDENTS,
  ROUTE_FILEUPLOAD
} from '../../config/routes.js';

const Router = () => {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(0); // We can pass this to route -> sidebar to alter what users see.

  useEffect(() => {
    if (user === 0 && location.pathname !== ROUTE_LOGIN) {
      history.push(ROUTE_LOGIN);
    }
    // eslint-disable-next-line
  }, [user, location]);

  return (
    <Switch>
      <Route exact path={ROUTE_HOME} setUser={setUser}>
        <Home user={user} />
      </Route>
      <Route exact path={ROUTE_LOGIN}>
        <Login setUser={setUser} />
      </Route>
      <Route exact path={ROUTE_STUDENTS} setUser={setUser}>
        <Students user={user}/>
      </Route>
      <Route exact path={ROUTE_FILEUPLOAD} setUser={setUser}>
        <FileUpload />
      </Route>
    </Switch>
  );
}

export default Router;