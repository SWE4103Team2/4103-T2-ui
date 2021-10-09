import React, { useState, useEffect } from 'react'
import Table from '../components/Table.js';
import { getStudents } from '../api/students';
import { Paper, TextField, Button } from '@mui/material';

export const Students = () => {

  const [students, setStudents] = useState([]);

  const columns = 
        [
        'ID', 
        'Name',
        'Start Date',
        'Program'
        ]
  
  const callGetStudents = async () => {
    getStudents().then(result =>{
      setStudents(result);
      console.log(result);
    })
  };

  return (
    <Paper sx={{ m: '1rem' }}>
        <Button variant="contained" component="span" onClick={() => callGetStudents()} > 
          List Students
        </Button>
      <TextField 
          id='outlined-basic'
          label="Search" 
          variant='outlined'
          margin='normal'
          height='50'
          sx={{
            left:'70%'
          }} />
      <Table names={columns} studentRows={students} />
    </Paper>
  );
};