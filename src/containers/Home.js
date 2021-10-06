import React from 'react';
import { Stack, Button } from '@mui/material'

export const Home = () => {
  return (
    <Stack spacing={2} sx={{ marginTop: '7.5rem', width: '10rem' }}>
      <Button variant="contained"> Program Coordinator </Button>
      <Button variant="contained"> Accreditation Coordinators </Button>
      <Button variant="contained"> Program Advisors </Button>
    </Stack>
  );
};