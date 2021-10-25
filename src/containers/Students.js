import React, { useState, useEffect } from 'react'
import Table from '../components/Table.js';
import Transcript from '../components/Transcript.js';
import { getStudents, getFileNames, getYear, getFileTypes, uploadCoreCoursesArr } from '../api/students';
import { Paper, Grid, TextField, Button, Select, MenuItem, Modal, Box} from '@mui/material';
import { XLSXUpload } from '../components/XLSXUpload'; 

/**
 * The student list and transcripts page
 */
export const Students = () => {
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [yearType, setYearType] = useState(0);
  const [programType, setProgramType] = useState('');
  const [programMenus, setProgramMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalRow, setModalRow] = useState(null);
  const [modalState, setModalState] = useState(false);

  //This represents the userID, probably a login or something, needed to allow multiple users to user the CoreCourse table
  const [userID, setUserID] = useState(1);

  // Column names for the  list students table
  const columns = [
    {field: 'Student_ID', headerName: 'ID',         flex: 0.5,  align: "center", headerAlign: "center"},
    {field: 'ShortName',  headerName: 'Name',       flex: 1,    align: "center", headerAlign: "center"},
    {field: 'Cohort',     headerName: 'Cohort',     flex: 1,    align: "center", headerAlign: "center"},
    {field: 'Rank',       headerName: 'Rank',       flex: 0.5,  align: "center", headerAlign: "center"},
    {field: 'Status',     headerName: 'Status',     flex: 1,    align: "center", headerAlign: "center"},
    {field: 'FirstName',  headerName: 'First Name', flex: 1,    align: "center", headerAlign: "center", hide:"true"},
    {field: 'LastName',   headerName: 'Last Name',  flex: 1,    align: "center", headerAlign: "center", hide:"true"},
    {field: 'Year',       headerName: 'Year',       flex: 0.5,  align: "center", headerAlign: "center", hide:"true"},
    {field: 'Start_Date', headerName: 'Start Date', flex: 0.5,  align: "center", headerAlign: "center", hide:"true"},
    {field: 'Program',    headerName: 'Program',    flex: 0.5,  align: "center", headerAlign: "center", hide:"true"},
  ]

  //Starts the loading animation
  //gets the list of students for the current fileID
  //OPTIONALLY if the search bar has content then it will search for the student id for that content
  //Internally this makes 2 API calls, one for the list of students, and another to get the year
  //The year has multiple ways of calculating it, this is specified with the drop down (or with 0,1,2, see API for details)
  const callGetStudents = async () => {
    setLoading(true);
    getStudents(file, searchValue).then(result => {
      getYear(file, searchValue, yearType, userID).then(year => {
        for (let i = 0; i < year.length; i++) {
          result[i].Year = year[i].Year === null ? 0 : year[i].Year;
        }
        setStudents(result);
      })
    });
    
  };

  //updates the file name drop down with the file names for the current program
  //loads nothing if theres no program specified (only ever not specified on page load)
  useEffect(() => {
    if(programType === ""){return;}
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

  //Only run once when the page loads
  //adds all the program types to the drop down
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

  // formats the students list with all the needed data for the list
  useEffect(() => {
    for (let i = 0; i < students.length; i++) {
      students[i].id = i+1;
      if(students[i].Student_ID !== null){
        students[i].Cohort = dateToCohort(students[i].Start_Date, students[i].Campus);
        students[i].FirstName = students[i].Name.substring(0, students[i].Name.indexOf(' '));
        students[i].LastName = students[i].Name.substring(students[i].Name.lastIndexOf(' ')+1);
        students[i].ShortName = students[i].LastName + students[i].FirstName[0];
        switch(students[i].Year){
          case 0: students[i].Rank = "FIR"; break;
          case 1: students[i].Rank = "FIR"; break;
          case 2: students[i].Rank = "SOP"; break;
          case 3: students[i].Rank = "JUN"; break;
          default: students[i].Rank = students[i].Year > 0 ? "SEN" : undefined;
        }
        
      }
      else{
        students[i].fileID = file;
        students[i].Student_ID = students[i].EStuID;
        students[i].Cohort = "N/A";
        students[i].Name = "Name Unknown";
        students[i].FirstName = "Name";
        students[i].LastName = "Unknown";
        students[i].ShortName = students[i].LastName + students[i].FirstName[0];
        students[i].Rank = "N/A";
        students[i].Year = 0;
        students[i].Start_Date = "????-??-??";
        students[i].Program = "??";
        students[i].Campus = "??";
      }
      students[i].Status = "Place Holder";
    }
    setLoading(false);
  }, [students]);

  //A function to turn the date to cohort
  //Any date before sept 1 becomes the previous years cohort
  const dateToCohort = (startDate, campus) => {
    let asYear = ((Date.parse(startDate)/31556926000)+1970);
    asYear = asYear%1 > 0.6652 ? Math.floor(asYear) : Math.floor(asYear)-1;
    return asYear + "-" + ((asYear+1)%100) + campus;
  };

  //Function to open the student transcript
  //activated in the "Table" component
  //is passed into the table
  const onRowDoubleClick = (rowData) => {
    setModalRow(rowData);
    setModalState(true);
  };

  const callUploadCoreCoursesArr = (arr) => {
    const upload = async () => {
      const data = await uploadCoreCoursesArr(arr, 1);
      console.log(data);
    };
    upload();
  }

  return (
    <Paper sx={{minWidth: '99%' }}>
      <Modal
        open={modalState}
        onBackdropClick={e => setModalState(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Transcript rowData={modalRow}/>
        </Box>
      </Modal>
      <Grid container sx={{ p: '1rem' }}>
        <Grid container xs={5} direction='row' justifyContent="flex-start">
          <Select
            variant="outlined"
            size="small"
            value={programType}
            onChange={(e) => {setFile(""); setProgramType(e.target.value)}}   
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
        <Grid container xs={5} md={7} direction='row' justifyContent="flex-end" alignItems="right" >
          <XLSXUpload setCourseArray={callUploadCoreCoursesArr} />
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
          <MenuItem value={3}>{"By Core Course"}</MenuItem>  
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
      <Table names={columns} studentRows={students} doubleClickFunction={onRowDoubleClick} loadingIn={loading}/>
    </Paper>
  );
};

//The style for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};