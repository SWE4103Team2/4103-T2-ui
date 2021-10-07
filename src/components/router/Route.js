import React, { useState, useEffect } from 'react';
import { Route as ReactRoute, useLocation } from 'react-router-dom';
import { Content, Header, Sidebar, Footer } from '../layout/index.js';
import { Grid, Box } from '@mui/material';
import { ROUTE_LOGIN } from '../../config/routes.js';

const Route = ({ children, ...rest }) => {
  const location = useLocation();
  const [check, setCheck] = useState(false);
  
  useEffect(() => {
    setCheck(location.pathname !== ROUTE_LOGIN);
  }, [location.pathname]);

  return (
    <ReactRoute {...rest}>
      <Grid>
        {check && <Sidebar />}
        <Box sx={check && { ml: '75px' }}>
          <Header />
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