import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Stack, Button, TextField } from '@mui/material'
import { ROUTE_HOME } from '../config/routes.js'
import { AC, PA, PC } from '../config/userType.js';
import { getUser } from '../api/login';

export const Login = ({ setUser }) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    getUser(username, password).then(result => {
      if(result.length !== 0){
        setUser(result[0]);
        history.push(ROUTE_HOME);
      }
      else{
        console.log(result);
      }
    });
  };

  return (
    <Stack spacing={2} sx={{ marginTop: '7.5rem', width: '10rem' }}>
      <TextField
        label="Username"
        type="text"
        value={username}
        size="small"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        size="small"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button 
        variant="contained" 
        onClick={handleLogin}> 
          Log In
      </Button>
      {/* <Button 
        variant="contained" 
        onClick={() => {
          setUser(PC);
          history.push(ROUTE_HOME)
        }}> 
          Program Coordinator
      </Button>
      <Button 
        variant="contained" 
        onClick={() => {
          setUser(AC);
          history.push(ROUTE_HOME)
        }}> 
          Accreditation Coordinators
      </Button>
      <Button 
        variant="contained" 
        onClick={() => {
          setUser(PA);
          history.push(ROUTE_HOME)
        }}> 
          Program Advisors
      </Button> */}
    </Stack>
  );
};