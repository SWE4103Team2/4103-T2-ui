import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import logo from '../../assets/unb.png'

const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <img src={logo} alt='' style={{ marginRight: '2rem', maxHeight: '2.75rem' }} />
        <Typography variant='h5'>
          SWE4103 Team 2
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;