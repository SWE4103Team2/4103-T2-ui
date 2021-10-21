import React, { useState, useEffect } from 'react'
import Table from '../components/Table.js';
import { getStudents, getFileNames, getYear } from '../api/students';
import { Paper, Grid, TextField, Button, Select, MenuItem, FormControl } from '@mui/material'; 

export const Students = () => {
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [yearType, setYearType] = useState(0);

  // Column names for the  list students table
  const columns = [
        {field: 'Student_ID', headerName: 'ID', width:'200', flex: 0.5, align: "center", headerAlign: "center"},
        {field: 'FirstName', headerName: 'First Name', width:'200', flex: 1, align: "center", headerAlign: "center"},
        {field: 'LastName', headerName: 'Last Name', width:'200', flex: 1, align: "center", headerAlign: "center"},
        {field: 'Start_Date', headerName: 'Cohort', width:'200', flex: 1, align: "center", headerAlign: "center"},
        {field: 'Campus', headerName: 'Campus', width:'200', flex: 0.5, align: "center", headerAlign: "center"},
        {field: 'Program', headerName: 'Program', width:'200', flex: 0.5, align: "center", headerAlign: "center"},
        {field: 'Year', headerName: 'Year', width:'200', flex: 0.5, align: "center", headerAlign: "center"}
  ]

  /*
    A call to the API to grab the list of students.
    Either grab all students in the specific file or
    grab a student using their student_ID from the search bar.
  */
  const callGetStudents = async () => {
    getStudents(file, searchValue).then(result => {
      getYear(file, searchValue, yearType).then(year => {
        for (let i = 0; i < year.length; i++) {
          result[i].Year = year[i].Year === null ? 0 : year[i].Year;
        }
        setStudents(result);
      })
    });
    
  };

  // Grabbing the file names from the database
  useEffect(() => {
    getFileNames().then(result => {
      const options = result.map(item => {
        return <MenuItem value={item.fileID}>{item.fileID}</MenuItem>
      });
      setMenuItems(options);
      if(result.length !== 0){
        setFile(result[0].fileID);
      }
    });
  }, []);

  // Adding a id property to each student in order to add them to the datagrid table.
  useEffect(() => {
    for (let i = 0; i < students.length; i++) {
      students[i].id = i+1;
      students[i].Start_Date = dateToCohort(students[i].Start_Date, students[i].Campus);
      students[i].FirstName = students[i].Name.substring(0, students[i].Name.indexOf(' '));
      students[i].LastName = students[i].Name.substring(students[i].Name.lastIndexOf(' '));
    }
  }, [students]);

  const dateToCohort = (startDate, campus) => {
    let asYear = ((Date.parse(startDate)/31556926000)+1970);
    asYear = asYear%1 > 0.6652 ? Math.floor(asYear) : Math.floor(asYear)-1;
    return asYear + "-" + (asYear+1) + ", " + campus;
  };

  return (
    <Paper sx={{minWidth: '99%' }}>
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
          <Select
            variant="outlined"
            size="small"
            value={yearType}
            onChange={(e) => setYearType(e.target.value)}   
            sx={{ width: '15rem' }}
          >
          <MenuItem value={0}>{"By Credit Hour"}</MenuItem>
          <MenuItem value={1}>{"By Start Date"}</MenuItem>
          <MenuItem value={2}>{"By Cohort"}</MenuItem>  
          </Select>  
        </Grid>
        <Grid container xs="5" md="7" direction='row' justifyContent="flex-end" alignItems="center" >
          <TextField 
            label="Search" 
            variant='outlined'
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