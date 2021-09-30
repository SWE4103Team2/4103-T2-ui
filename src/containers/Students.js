import React from 'react'
import Table from '../components/Table.js';
import { Container, Grid, Paper } from '@mui/material';

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