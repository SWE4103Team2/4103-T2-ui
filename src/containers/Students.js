import React, { useState, useEffect } from 'react'
import Table from '../components/Table.js';
import { getStudents, getStudent, getFileNames } from '../api/students';
import { Paper, Grid, TextField, Button, Select, MenuItem } from '@mui/material'; 

export const Students = () => {

  const [students, setStudents] = useState([]);
  const [file, setFile] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  // Column names for the  list students table
  const columns = [
        {field: 'student_ID', headerName: 'ID', width:'200', flex: 0.5, align: "center", headerAlign: "center"},
        {field: 'Fname-Lname', headerName: 'Name', width:'200', flex: 1, align: "center", headerAlign: "center"},
        {field: 'Start_Date', headerName: 'Start Date', width:'200', flex: 1, align: "center", headerAlign: "center"},
        {field: 'Program', headerName: 'Program', width:'200', flex: 1, align: "center", headerAlign: "center"},
  ]

  /*
    A call to the API to grab the list of students 
  */
  const callGetStudents = async () => {
    if(searchValue === "") {
      getStudents().then(result => {
        setStudents(result);
      })
    } else {
      getStudent(searchValue).then(result => {
        setStudents(result);
        console.log(result);

      })
    }
  };

  useEffect(() => {
    getFileNames().then(result => {
      const options = result.map(item => {
        return <MenuItem value={item.fileID}>{item.fileID}</MenuItem>
      });
      setMenuItems(options);
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < students.length; i++) {
      students[i].id = i+1;
    }
  }, [students])


  return (
    <Paper sx={{minWidth:1400 }}>
      <Grid container sx={{ p: '1rem' }}>
        <Grid xs="5">
          <Select
            variant="outlined"
            size="small"
            value={file}
            onChange={(e) => setFile(e.target.value)}   
            sx={{ width: '15rem' }}
          >
            {menuItems}
          </Select> 
        </Grid>
        <Grid xs="5"> {/* Make this align right */}
          <TextField 
            label="Search" 
            variant='outlined'
            size="small"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button variant="contained" wrap component="span" onClick={() => callGetStudents()}> 
            List Students
          </Button>
        </Grid>
      </Grid>
      <Table names={columns} studentRows={students} />
    </Paper>
  );
};