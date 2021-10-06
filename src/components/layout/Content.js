import React from 'react';
import { Container, Grid } from '@mui/material';

const Content = ({ children }) => {
  return (
    <Container maxWidth="false">
      <Grid container justifyContent="center">
        {children}
      </Grid>
    </Container>
  );
};

export default Content;