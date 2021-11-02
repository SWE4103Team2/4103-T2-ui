import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
// import { FileUpload } from '../components/FileUpload';
// import { uploadStudents } from '../api/upload';
import { PC, AC, PA } from '../config/userType.js';

// This is temporary.
export const Home = ({ user }) => {
  return (
    <Paper sx={{ width: '99%', minHeight: '100%' }}>
      {user.username === "" ?
      <Typography sx={{ p: '0.5rem', mr: '0.5rem' }}> Oh no! You dont have a username, what are we going to do?! </Typography>
      :
      <Typography sx={{ p: '0.5rem', mr: '0.5rem' }}> Hello, {user.username}</Typography>
      }
      <Box sx={{ m: '5rem'}} />
    </Paper>
  );
};