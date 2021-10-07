import React from 'react';
import { useHistory } from 'react-router';
import { Stack, Button } from '@mui/material'
import { ROUTE_HOME } from '../config/routes.js'
import { AC, PA, PC } from '../config/userType.js';

export const Login = ({ setUser }) => {
  const history = useHistory();

  return (
    <Stack spacing={2} sx={{ marginTop: '7.5rem', width: '10rem' }}>
      <Button 
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
      </Button>
    </Stack>
  );
};