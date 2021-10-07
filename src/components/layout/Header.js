import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, MenuItem, Toolbar, Typography } from '@mui/material';
import { ROUTE_HOME } from '../../config/routes.js';

const Header = () => {
  return (
    <AppBar position='static' sx={{ height: "4rem" }}>
      <Toolbar>
        <MenuItem component={Link} to={ROUTE_HOME}>
          <Typography variant='h5'>
            SWE4103 Team 2
          </Typography>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}

export default Header;