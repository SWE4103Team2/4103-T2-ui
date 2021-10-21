import React, { useState, useEffect } from 'react'
import Table from '../components/Table.js';
import { getStudents, getStudent, getFileNames } from '../api/students';
import { Paper, Grid, TextField, Button, Select, MenuItem } from '@mui/material'; 

export const Students = () => {
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  // Column names for the  list students table
  const columns = [
        {field: 'Student_ID', headerName: 'ID', width:'200', flex: 0.5, align: "center", headerAlign: "center"},
        {field: 'Name', headerName: 'Name', width:'200', flex: 1, align: "center", headerAlign: "center"},
        {field: 'Start_Date', headerName: 'Start Date', width:'200', flex: 1, align: "center", headerAlign: "center"},
        {field: 'Program', headerName: 'Program', width:'200', flex: 1, align: "center", headerAlign: "center"},
  ]

  /*
    A call to the API to grab the list of students.
    Either grab all students in the specific file or
    grab a student using their student_ID from the search bar.
  */
  const callGetStudents = async () => {
    if(searchValue === "") {
      getStudents(file).then(result => {
        setStudents(result);
      })
    } else {
      getStudent(searchValue, file).then(result => {
        setStudents(result);
      });
    }
  };

  // Grabbing the file names from the database
  useEffect(() => {
    getFileNames().then(result => {
      const options = result.map(item => {
        return <MenuItem value={item.fileID}>{item.fileID}</MenuItem>
      });
      setMenuItems(options);
    });
  }, []);

  // Adding a id property to each student in order to add them to the datagrid table.
  useEffect(() => {
    for (let i = 0; i < students.length; i++) {
      students[i].id = i+1;
    }
  }, [students]);

  // Update student list on file change
  useEffect(() => {
    const f = async () => {
      await callGetStudents();
    }
    f();
  }, [file]);

  return (
    <Paper sx={{minWidth: '99%' }}>
      <Grid container sx={{ p: '1rem' }}>
        <Grid xs="5">
          <Select
            variant="outlined"
            size="small"
            value={file}
            onChange={(e) => {setSearchValue(""); setFile(e.target.value)}}   
            sx={{ width: '15rem' }}
          >
            {menuItems}
          </Select> 
        </Grid>
        <Grid container xs="5" md="7" direction='row' justifyContent="flex-end" alignItems="center" >
          <TextField 
            label="Search" 
            variant='outlined'
            value={searchValue}
            size="small"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button variant="contained" component="span" sx={{marginLeft:3}} onClick={() => callGetStudents()}> 
            List Students
          </Button>
        </Grid>
      </Grid>
      <Table names={columns} studentRows={students} />
    </Paper>
  );
};