import React, { useState, useEffect } from 'react'
import Table from '../components/Table.js';
import { getStudents, getStudent, getFileNames } from '../api/students';
import { Paper, TextField, Button, Select, MenuItem } from '@mui/material'; 

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
    <Paper sx={{
      minHeight:'52pc',
      minWidth:1400,
      backgroundColor: 'white',
      m: '1rem' 
    }}>
        <Select
          label="Current File"
          value={file}
          autoWidth
          placeholder="Choose File"
          onChange={(e) => setFile(e.target.value)}   
          sx={{
            minWidth:150,
            minHeight:50,
            margin:2,
          }}
        >
          {menuItems};
        </Select> 
        <TextField 
          id='outlined-basic'
          label="Search" 
          variant='outlined'
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{
            left:'58%',
            margin:2
          }} />
        <Button variant="contained" wrap component="span" onClick={() => callGetStudents()} sx={{
          left:"58%"
        }}> 
          List Students
        </Button>
      <Table names={columns} studentRows={students} />
    </Paper>
  );
};