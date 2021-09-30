import React from 'react';
import { Container, Grid, Stack, Button } from '@mui/material'

export const Home = () => {
  return (
    <Container maxWidth="false">
      <Grid container justifyContent="center">
        <Stack spacing={2} sx={{ marginTop: '7.5rem', width: '10rem' }}>
          <Button variant="contained"> Program Coordinator </Button>
          <Button variant="contained"> Accreditation Coordinators </Button>
          <Button variant="contained"> Program Advisors </Button>
        </Stack>
      </Grid>
    </Container>
  );
};