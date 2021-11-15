import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, MenuItem, Toolbar, Typography, Button } from '@mui/material';
import { ROUTE_HOME } from '../../config/routes.js';

const Header = ({ setUser, login }) => {

  const handleSetUser = () => {
    setUser(0);
  }

  return (
    <AppBar position='static' sx={{ height: "4rem", mb: "2rem" }}>
      <Toolbar>
      <MenuItem sx={{ flexGrow: 1 }} component={!login ? Link : null} to={ROUTE_HOME}>
          <Typography 
            variant='h5'
            id="home">
            SWE4103 Team 2
          </Typography>
        </MenuItem>
        {setUser &&
        <MenuItem >
          <Button 
            variant="contained" 
            id="logout"
            onClick={handleSetUser}> 
              Log Out
          </Button>
        </MenuItem>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Header;