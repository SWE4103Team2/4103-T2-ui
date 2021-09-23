import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import logo from '../../assets/unb.jpg'

const Header = () => {
  return (
    <Grid container borderBottom={2.5} maxHeight='5rem'>
      <Stack alignItems='center' direction='row'> 
        <img src={logo} alt="" height='75px' className='logo' />
        <Divider orientation='vertical' sx={{ mr: '2rem' }} />
        <h1> SWE4103 Team2 </h1>
      </Stack>
    </Grid>
  );
}

export default Header;