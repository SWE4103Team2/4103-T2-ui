import React from 'react';
import { Route as ReactRoute } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import { Content, Header, Sidebar, Footer } from '../layout/index.js';

const Route = ({ children, ...rest }) => {
  return (
    <ReactRoute {...rest}>
      <Grid>
        <Sidebar />
        <Box sx={{ ml: '75px' }}>
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