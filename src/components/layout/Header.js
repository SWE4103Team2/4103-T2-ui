import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position='static' sx={{ height: "4rem" }}>
      <Toolbar>
        <Typography variant='h5'>
          SWE4103 Team 2
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;