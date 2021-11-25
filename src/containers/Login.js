import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Stack, Button, TextField, Paper, Collapse, Alert } from '@mui/material'
import { ROUTE_HOME } from '../config/routes.js'
import { getUser } from '../api/login';
const crypto = require('crypto');

export const Login = ({ setUser }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // Encrypts Password
  const getSHA256 = input => {
    return crypto.createHash('sha256').update(input).digest('hex');
  }

  // Verifies Login
  const handleLogin = () => {
    //if (username && password) {
      getUser(getSHA256(username), getSHA256(password))
      .then(result => {
        if(result.length !== 0){
          result[0].username = username;
          setUser(result[0]);
          history.push(ROUTE_HOME);
        }
        else{
          setError(true);
        }
      });
    //} else {
    //  setError(true);
    //}
  };

  // Removes Error Message after timeout (2 Seconds).
  useEffect(() => {
    const timeId = setTimeout(() => {
      setError(false);
    }, 5000);

    return () => clearTimeout(timeId);
    // eslint-disable-next-line
  }, [error]);

  return (
     <Paper sx={{ mt: '5rem', p: '2rem', pt: '5rem', height: '20rem', width: '25rem' }}>
      <Stack spacing={5} justifyContent="center" alignItems="center">
        {/** Username / Password Inputs **/}
        <TextField
          size="small"
          type="text"
          label="Username"
          value={username}
          onKeyPress={e => e.key === "Enter" && handleLogin()}
          onChange={e => setUsername(e.target.value)}
          sx={{ width: '90%' }}
        />
        <TextField
          size="small"
          type="password"
          label="Password"
          value={password}
          onKeyPress={e => e.key === "Enter" && handleLogin()}
          onChange={e => setPassword(e.target.value)}
          sx={{ width: '90%' }}
        />

        {/** Submit Button **/}
        <Button 
          variant="contained" 
          onClick={() => handleLogin()}
        > 
          Log In
        </Button>

        {/** Error Message Popup **/}
        <Collapse in={error} sx={{ width: '80%' }}>
          <Alert
            severity={'error'}
            color={'error'}
          >
            Error Logging In. 
            <br />
            Check your credentials and try again.
          </Alert>
        </Collapse>
      </Stack>
    </Paper>
  );
};