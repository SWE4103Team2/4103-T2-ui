import React from 'react'
import { Paper } from '@mui/material';
import { FileUpload } from '../components/FileUpload';
import { uploadStudents } from '../api/upload';

export const Students = () => {
  return (
    <Paper sx={{ m: '1rem' }}>
      <FileUpload apiFunction={uploadStudents} />
    </Paper>
  );
};