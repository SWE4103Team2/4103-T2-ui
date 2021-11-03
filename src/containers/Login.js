import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Stack, Button, TextField, Paper, Collapse, Alert } from '@mui/material'
import { ROUTE_HOME } from '../config/routes.js'
import { AC, PA, PC } from '../config/userType.js';
import { getUser } from '../api/login';

export const Login = ({ setUser }) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);

  const crypto = require('crypto');
  const getSHA256 = function(input){
    return crypto.createHash('sha256').update(input).digest('hex')
  }

  const handleLogin = () => {
    getUser(getSHA256(username), getSHA256(password)).then(result => {
      if(result.length !== 0){
        result[0].username = username;
        setUser(result[0]);
        history.push(ROUTE_HOME);
      }
      else{
        setErrorColor("error");
        setErrorMessage("Invalid Credentials!");
        setErrorAlert(true)
      }
    });
  };

  const checkEnter = (key) => {
    if(key === "Enter"){
      handleLogin();
    }
  };

  useEffect(() => {
    const timeId = setTimeout(() => { // After 2 seconds set the errorAlert value to false
      setErrorAlert(false)
    }, 2000);
    return () => {
        clearTimeout(timeId)
      }
  }, [errorAlert]);

  return (
     <Paper sx={{ p: '7.5rem', width: '10rem' }}>
      <Stack spacing={10} justifyContent="center" alignItems="center">
        <TextField
          label="Username"
          type="text"
          value={username}
          size="small"
          onKeyPress={(e) => {
            if(e.key === "Enter"){
              console.log(getSHA256(username));
            }
          }}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ width: '15rem' }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          size="small"
          onKeyPress={(e) => checkEnter(e.key)}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: '15rem' }}
        />
        <Button 
          variant="contained" 
          onClick={handleLogin}> 
            Log In
        </Button>
        <Collapse in={errorAlert} sx={{ width: '12rem' }}>
          <Alert
            severity={errorColor}
            color={errorColor}
            >
            {errorMessage}
          </Alert>
        </Collapse>
      </Stack>
    </Paper>
  );
};