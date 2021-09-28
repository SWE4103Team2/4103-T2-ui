import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '../components/Table.js';
import Container from '@mui/material/Container';

export const Students = () => {
  return (
    <Container maxWidth="false">
      <Grid container justifyContent="center">
        <Paper sx={{ m: '1rem' }}>
          <Table />
        </Paper>
      </Grid>
    </Container>
  );
};