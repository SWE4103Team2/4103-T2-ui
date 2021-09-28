import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Table from '../components/Table.js';

export const Students = () => {
  return (
    <Container maxWidth="false">
      <Grid container justifyContent="center">
        <Table />
      </Grid>
    </Container>
  );
};