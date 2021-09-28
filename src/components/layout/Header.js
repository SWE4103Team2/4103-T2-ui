import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import logo from '../../assets/unb.png'

const Header = () => {
  return (
    <Grid container borderBottom={2.5} bgcolor='#ffffff70' height='3rem'>
      <Stack alignItems='flex-end' direction='row'> 
        <img src={logo} alt='' style={{ marginLeft: '0.5rem', maxHeight: '2.75rem' }} />
        <h1 style={{ marginLeft: '1rem' }}> SWE4103 Team2 </h1>
      </Stack>
    </Grid>
  );
}

export default Header;