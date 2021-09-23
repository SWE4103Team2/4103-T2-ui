import React from 'react';
import { Route as ReactRoute } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Content, Header, Sidebar, Footer } from '../layout/index.js';

const Route = ({ children, ...rest }) => {
  return (
    <ReactRoute {...rest}>
      <Grid>
        <Header />
        <Sidebar />
        <Content>
          {children}
        </Content>
        <Footer />
      </Grid>
    </ReactRoute>
  );
};

export { Route };