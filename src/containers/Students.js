import React, { useState, useEffect } from 'react'
import Table from '../components/Table.js';
import { getStudents, getFileNames, getYear, getFileTypes } from '../api/students';
import { Paper, Grid, TextField, Button, Select, MenuItem, FormControl } from '@mui/material'; 

export const Students = () => {
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [yearType, setYearType] = useState(0);
  const [programType, setProgramType] = useState('');
  const [programMenus, setProgramMenus] = useState([]);

  // Column names for the  list students table
  const columns = [
    {field: 'Student_ID', headerName: 'ID',         flex: 0.5,  align: "center", headerAlign: "center"},
    {field: 'FirstName',  headerName: 'First Name', flex: 1,    align: "center", headerAlign: "center"},
    {field: 'LastName',   headerName: 'Last Name',  flex: 1,    align: "center", headerAlign: "center"},
    {field: 'Cohort',     headerName: 'Cohort',     flex: 1,    align: "center", headerAlign: "center"},
    {field: 'Rank',       headerName: 'Rank',       flex: 0.5,  align: "center", headerAlign: "center"},
    {field: 'Year',       headerName: 'Year',       flex: 0.5,  align: "center", headerAlign: "center"},
    {field: 'Start_Date', headerName: 'Start_Date', flex: 0.5,  align: "center", headerAlign: "center"},
    {field: 'Status',     headerName: 'Status',     flex: 1,    align: "center", headerAlign: "center"},
    {field: 'Program',    headerName: 'Program',    flex: 0.5,  align: "center", headerAlign: "center"},
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
    getFileNames(programType).then(result => {
      const options = result.map(item => {
        return <MenuItem value={item.fileID}>{item.fileID}</MenuItem>
      });
      setMenuItems(options);
      if(result.length !== 0){
        setFile(result[0].fileID);
      }
    });
  }, [programType]);

  useEffect(() => {
    getFileTypes().then(result => {
      const options = result.map(item => {
        return <MenuItem value={item.program}>{item.program}</MenuItem>
      });
      setProgramMenus(options);
      if(result.length !== 0){
        setProgramType(result[0].program);
      }
    });
  }, []);

  // Adding a id property to each student in order to add them to the datagrid table.
  useEffect(() => {
    for (let i = 0; i < students.length; i++) {
      students[i].id = i+1;
      students[i].Cohort = dateToCohort(students[i].Start_Date, students[i].Campus);
      students[i].FirstName = students[i].Name.substring(0, students[i].Name.indexOf(' '));
      students[i].LastName = students[i].Name.substring(students[i].Name.lastIndexOf(' ')+1);
      switch(students[i].Year){
        case 1: students[i].Rank = "FIR"; break;
        case 2: students[i].Rank = "SOP"; break;
        case 3: students[i].Rank = "JUN"; break;
        default: students[i].Rank = students[i].Year > 0 ? "SEN" : "N/A";
      }
      students[i].Status = students[i].Rank === "SEN" ? "Ready to Graduate" : students[i].Rank === "N/A" ? "Unknown" : "In Progress";
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
            value={programType}
            onChange={(e) => setProgramType(e.target.value)}   
            sx={{ width: '15rem' }}
          >
            {programMenus}
          </Select>  
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
        <Grid container xs="5" md="7" direction='row' justifyContent="flex-end" alignItems="center" >
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