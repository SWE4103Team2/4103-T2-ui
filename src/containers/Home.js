import React from 'react';
import { Typography } from '@mui/material'
import { PC, AC, PA } from '../config/userType.js'

// This is temporary.
export const Home = ({ user }) => {
  return (
    <>
      <Typography sx={{ mr: '0.5rem' }}> Hello </Typography>
      {user === PC && <Typography> Program Coordinator </Typography>}
      {user === AC && <Typography> Accreditation Coordinators </Typography>}
      {user === PA && <Typography> Program Advisors </Typography>}
    </>
  );
};