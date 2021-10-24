import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
// import { FileUpload } from '../components/FileUpload';
// import { uploadStudents } from '../api/upload';
import { PC, AC, PA } from '../config/userType.js';

// This is temporary.
export const Home = ({ user }) => {
  return (
    <Paper sx={{ width: '99%', minHeight: '100%' }}>
      <Typography sx={{ mr: '0.5rem' }}> Hello </Typography>
      {user === PC && <Typography> Program Coordinator </Typography>}
      {user === AC && <Typography> Accreditation Coordinators </Typography>}
      {user === PA && <Typography> Program Advisors </Typography>}
      <Box sx={{ m: '5rem'}} />
      {/* <FileUpload apiFunction={uploadStudents} /> */}
    </Paper>
  );
};