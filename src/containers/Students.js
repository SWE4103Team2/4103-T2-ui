import React, { useState, useEffect } from 'react'
import { CustomSearch, DeleteButton, InfoPopover, MenuDropDown, SelectBox, Table, TranscriptModal, XLSXSnackbar, XLSXUpload } from '../components';
import { largeModal } from '../config/modalStyles.js';
import { getStudents, getFileNames, getYear, getFileTypes, uploadCoreCoursesArr, getAllCourses, deleteFile } from '../api/students';
import { Paper, Grid, Button, MenuItem, Modal, Box } from '@mui/material';
import { studentColumns } from '../config/tablesColumns.js';

export const Students = ({user}) => {
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [yearType, setYearType] = useState(0);
  const [programType, setProgramType] = useState('');
  const [programMenus, setProgramMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalRow, setModalRow] = useState(null);
  const [transcriptState, setTranscriptState] = useState(false);
  const [customSearchState, setCustomSearchState] = useState(false);
  const [customSearchVal, setCustomSearchVal] = useState({ second: [], third: [], fourth: [], creditHoursPer: [0, 0, 0], minCoursePer: [0, 0, 0] });
  const [courses, setCourses] = useState([]);
  const [deleteUpdater, setDeleteUpdater] = useState(false);
  const [XLSXAlertInfo, setXLSXAlertInfo] = useState([false, [], false]);

  //This represents the userID, probably a login or something, needed to allow multiple users to user the CoreCourse table
  const [userID, setUserID] = useState(1);

  useEffect(() => {
    if(user.userID){
      setUserID(user.userID);
    }
  }, [user]);

  // Gets File Select Values (Updates on Delete / Program Change)
  useEffect(() => {
    if(programType) {
      setSearchValue(""); 
      getFileNames(programType).then(result => {
        if (result.length > 0) {
          const options = result.map(item => {
            return <MenuItem value={item.fileID}> {item.fileID} </MenuItem>
          });
          setMenuItems(options);
          setFile(result[0].fileID);
        }
      });
    }
    // eslint-disable-next-line
  }, [programType, deleteUpdater]);

  // Gets Program Type Values
  useEffect(() => {
    getFileTypes().then(result => {
      if (result.length > 0) {
        const options = result.map(item => {
          return <MenuItem value={item.program}> {item.program} </MenuItem>
        });
        setProgramMenus(options);
        setProgramType(result[0].program);
      }
    });

    getAllCourses().then(result => {
      setCourses(result);
    });
    // eslint-disable-next-line
  }, [deleteUpdater]); // Does DeleteUpdater required here???

  // Formats Student List
  useEffect(() => {
    for (let i = 0; i < students.length; i++) {
      students[i].id = i+1;
      if(students[i].Student_ID){
        students[i].Cohort = dateToCohort(students[i].Start_Date, students[i].Campus);
        students[i].FirstName = students[i].Name.substring(0, students[i].Name.indexOf(' '));
        students[i].LastName = students[i].Name.substring(students[i].Name.lastIndexOf(' ')+1);
        students[i].ShortName = students[i].LastName + (students[i].FirstName[0] ? students[i].FirstName[0] : "");

        switch(students[i].Year){
          case 0: students[i].Rank = "0-FIR"; break;
          case 1: students[i].Rank = "1-FIR"; break;
          case 2: students[i].Rank = "2-SOP"; break;
          case 3: students[i].Rank = "3-JUN"; break;
          default: students[i].Rank = students[i].Year + (students[i].Year > 0 ? "-SEN" : "-N/A");
        } 
      } else {
        students[i].fileID = file;
        students[i].Student_ID = students[i].EStuID;
        students[i].Cohort = "N/A";
        students[i].Name = "Name Unknown";
        students[i].FirstName = "Name";
        students[i].LastName = "Unknown";
        students[i].ShortName = students[i].LastName + students[i].FirstName[0];
        students[i].Rank = "0-N/A";
        students[i].Year = 0;
        students[i].Start_Date = "????-??-??";
        students[i].Program = "??";
        students[i].Campus = "??";
        students[i].Missing = true;
      }
      students[i].Status = "Place Holder"; // Not Handled Yet
    }

    setLoading(false);
    // eslint-disable-next-line
  }, [students]);

  // Converts Date to Cohort (Dates Earlier than Sept 1 become previous years Cohort)
  const dateToCohort = (startDate, campus) => {
    const date = ((Date.parse(startDate)/31556926000)+1970);
    const cohortYear = date%1 > 0.6652 ? Math.floor(date) : Math.floor(date)-1;
    return cohortYear + "-" + ((cohortYear+1)%100) + campus;
  };

  // Opens Transcript
  const openTranscript = (rowData) => {
    setModalRow(rowData);
    setTranscriptState(true);
  };

  // Updates Student List
  useEffect(() => {
    if (file) {
      setLoading(true);
      getStudents(searchValue, file).then(result => {
        getYear(file, searchValue, yearType, userID, customSearchVal).then(year => {
          for (let i = 0; i < year.length; i++) {
            result[i].Year = year[i].Year === null ? 0 : year[i].Year;
          }

          setStudents(result);
        })
      })
    }
    // eslint-disable-next-line
  }, [file, yearType, customSearchVal]); // Can we get rid of CustomSearchVal??

  // Upload Core Courses File
  const callUploadCoreCoursesArr = (arr) => {
    if(arr === undefined){
      setXLSXAlertInfo([true, "Incorrect file type.", true]);
    }
    else if(arr.length > 0){
      const upload = async () => {
        const data = await uploadCoreCoursesArr(arr, userID);
        if(data.insert !== 0){
          setXLSXAlertInfo([true, "The old " + data.delete + " courses were replaced with " + data.insert + " new ones.", false]);
        }
        else{
          setXLSXAlertInfo([true, "Unable to Insert " + arr.length + " Courses.", true]);
        }
      };
      upload();
    }
    else{
      setXLSXAlertInfo([true, "No courses read from file.", true]);
    }
  }

  // Extra Header Buttons
  // I think we should get rid of buttons and have the menu operate the onclick operations.
  const menuButtons = [
    <MenuItem>
      <InfoPopover info={"Used to create a custom set of criteria to decide what rank each student should be."} />
      <Button fullWidth="true" variant="contained" onClick={() => {setCustomSearchState(true)}}>
        Custom Rank
      </Button>
    </MenuItem>,
    <MenuItem>
      <InfoPopover info={"Used to load the core courses. This function only accepts XLSX files in the format shown on this site. These courses can be used to calculate rank and in the transcripts."} />
      <XLSXUpload setCourseArray={() => callUploadCoreCoursesArr()} />
    </MenuItem>,
    <MenuItem>
      <InfoPopover info={"Used to delete all the files related to the currently selected File ID."} />
      <DeleteButton apiFunction={deleteFile} fileIDIn={file} setUpdate={setDeleteUpdater} updateState={deleteUpdater}/>
    </MenuItem>
  ]

  const rankRows = [
    "By Credit Hour",
    "By Start Date",
    "By Cohort",
    "By Core Course",
    "By Custom Requirements",
  ]

  return (
    <>
      {/** Transcript Modal **/}
      <Modal open={transcriptState} onBackdropClick={() => setTranscriptState(false)}>
        <Box sx={largeModal}>
          <TranscriptModal rowData={modalRow} userID={userID} programIn={programType}/>
        </Box>
      </Modal>
          
      {/** Custom Rank Modal **/}
      <Modal open={customSearchState} onBackdropClick={() => setCustomSearchState(false)}>
        <Box sx={largeModal}>
          <CustomSearch courses={courses} setSearchObject={setCustomSearchVal} searchObjectIn={customSearchVal} setModalVisible={setCustomSearchState}/>
        </Box>
      </Modal>
    
      {/** Alert For XLSX Upload **/}
      <XLSXSnackbar info={XLSXAlertInfo} />

      {/** Main Page **/}
      <Paper sx={{width: '99%'}}>
        <Grid
          container
          rowSpacing={2}
          justifyContent="center"
          alignItems="center"
          style={{ textAlign:'center' }}
          sx={{ pt: '1.5rem', pb: '0.75rem' }}
        >
          {/** Program Type Select **/}
          <Grid item xs={12} sm={6} md={3}>
            <SelectBox
              value={programType}
              label="Program"
              onChange={e => setProgramType(e.target.value)}   
            >
              {programMenus}
            </SelectBox>
          </Grid>

          {/** FileID Select **/}
          <Grid item xs={12} sm={6} md={3}> 
            <SelectBox
              value={file}
              label="File ID"
              onChange={e => setFile(e.target.value)}   
            >
              {menuItems}
            </SelectBox>
          </Grid>

          {/** Rank Select **/}
          <Grid item xs={12} sm={6} md={3}>
            <SelectBox
              value={yearType}
              label="Calculate Rank"
              onChange={e => setYearType(e.target.value)}   
              renderValue={row => rankRows[row]}
            >
              <MenuItem value={0}>
                <InfoPopover info={"For each 40 passed credit hours, the students rank increases."} />
                By Credit Hour
              </MenuItem>
              <MenuItem value={3}>
                <InfoPopover info={"Based off the courses in the XLSX file submitted in the \"Extras Menu\"."} />
                By Core Course
              </MenuItem> 
              <MenuItem value={4}>
                <InfoPopover info={"Based off the criteria from \"Custom Rank\" in the \"Extras Menu\"."} />
                By Custom Requirements
              </MenuItem>  
              <MenuItem value={1}>
                <InfoPopover info={"Counts the number of years since the student started based off the current date."} />
                By Start Date
              </MenuItem>
              <MenuItem value={2}>
                <InfoPopover info={"Counts the number of years since the start of the students cohort."} />
                By Cohort
              </MenuItem> 
            </SelectBox>
          </Grid>
          
          {/** Extras Menu **/}
          <Grid item xs={12} sm={6} md={3}>
            <MenuDropDown menuButtonsIn={menuButtons}/>
          </Grid>
        </Grid>

        {/** Students Table **/}
        <Grid container rowSpacing={2} justifyContent="center" alignItems="center" style={{ textAlign:'center' }} sx={{ pb: '1rem' }}>
          <Grid item xs={12} sm={12} md={12} sx={{ pl: '1rem', pr: '1rem' }}>
            <Table names={studentColumns} studentRows={students} doubleClickFunction={openTranscript} loadingIn={loading}/>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

//The style for the modal
