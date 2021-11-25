import React, { useState, useEffect } from 'react';
import { Route as ReactRoute, useLocation } from 'react-router-dom';
import { Content, Header, Sidebar, Footer } from '../layout/index.js';
import { Grid, Box } from '@mui/material';
import { ROUTE_LOGIN } from '../../config/routes.js';

const Route = ({ setUser, children, ...rest }) => {
  const location = useLocation();
  const [login, setLogin] = useState(false);
  
  useEffect(() => {
    setLogin(location.pathname === ROUTE_LOGIN);
  }, [location.pathname]);

  return (
    <ReactRoute {...rest}>
      <Grid>
        {!login && <Sidebar />}
        <Box sx={!login ? { ml: '75px' } : null}>
          <Header setUser={setUser} login={login} />
          <Content>
            {children}
          </Content>
          <Footer />
        </Box>
      </Grid>
    </ReactRoute>
  );
};

export { Route };