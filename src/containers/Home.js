import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

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