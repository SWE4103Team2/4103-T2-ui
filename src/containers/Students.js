import React, { useState, useEffect } from 'react'
import Table from '../components/Table.js';
import Transcript from '../components/Transcript.js';
import CustomSearch from '../components/CustomSearch.js';
import DeleteButton from '../components/DeleteButton';
import MenuDropDown from '../components/MenuDropDown';
import InfoPopover from '../components/InfoPopover';
import { getStudents, getFileNames, getYear, getFileTypes, uploadCoreCoursesArr, getAllCourses, deleteFile, getCampusCounts, getRankCounts, getCourseCounts, getCoopCounts } from '../api/students';
import { Paper, Grid, Button, Select, MenuItem, Modal, Box, FormControl, InputLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { XLSXUpload } from '../components/XLSXUpload'; 
import XLSXSnackbar from '../components/XLSXSnackbar.js';
import { GridToolbarFilterButton } from '@mui/x-data-grid';



/**
 * The student list and transcripts page
 */
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
  const [customSearchVal, setCustomSearchVal] = useState({second: [], third: [], fourth: [], creditHoursPer: [0, 0, 0], minCoursePer: [0, 0, 0]});
  const [courses, setCourses] = useState([]);
  const [deleteUpdater, setDeleteUpdater] = useState(false);
  const [XLSXAlertInfo, setXLSXAlertInfo] = useState([false, [], false]);
  const [countType, setCountType] = useState('misc');
  const [countsData, setCountsData] = useState([]);

  //This represents the userID, probably a login or something, needed to allow multiple users to user the CoreCourse table
  const [userID, setUserID] = useState(1);
  useEffect(() => {
    if(user.userID){
      setUserID(user.userID);
    }
  }, [user]);
  // Column names for the  list students table
  const columnsStudent = [
    {field: 'Student_ID', headerName: 'ID',         flex: 0.5,  align: "center", headerAlign: "center"},
    {field: 'ShortName',  headerName: 'Name',       flex: 1,    align: "center", headerAlign: "center"},
    {field: 'Cohort',     headerName: 'Cohort',     flex: 1,    align: "center", headerAlign: "center"},
    {field: 'Rank',       headerName: 'Rank',       flex: 0.5,  align: "center", headerAlign: "center"},
    {field: 'Status',     headerName: 'Status',     flex: 1,    align: "center", headerAlign: "center"},
    {field: 'FirstName',  headerName: 'First Name', flex: 0.6,  align: "center", headerAlign: "center", hide:"true"},
    {field: 'LastName',   headerName: 'Last Name',  flex: 0.6,  align: "center", headerAlign: "center", hide:"true"},
    {field: 'Year',       headerName: 'Year',       flex: 0.5,  align: "center", headerAlign: "center", hide:"true"},
    {field: 'Start_Date', headerName: 'Start Date', flex: 0.5,  align: "center", headerAlign: "center", hide:"true"},
    {field: 'Program',    headerName: 'Program',    flex: 0.5,  align: "center", headerAlign: "center", hide:"true"},
  ]

  const columnsCountSortable = [
    {field: 'CountName', headerName: 'Type',   flex: 1,    align: "center", headerAlign: "center"},
    {field: 'Count',     headerName: 'Total',  flex: 1,    align: "center", headerAlign: "center"},
  ]
  
  const columnsCountNotSortable = [
    {field: 'CountNameNotSortable', headerName: 'Type',   flex: 1,    align: "center", headerAlign: "center", sortable: false},
    {field: 'CountNotSortable',     headerName: 'Total',  flex: 1,    align: "center", headerAlign: "center", sortable: false},
  ]

  //Starts the loading animation
  //gets the list of students for the current fileID
  //OPTIONALLY if the search bar has content then it will search for the student id for that content
  //Internally this makes 2 API calls, one for the list of students, and another to get the year
  //The year has multiple ways of calculating it, this is specified with the drop down (or with 0,1,2,3,4 see API for details)
  const callGetStudents = async () => {
    setLoading(true);
    callCountAPI(countType);
    getStudents(searchValue, file).then(result => {
      getYear(file, searchValue, yearType, userID, customSearchVal, false).then(year => {
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
    setSearchValue(""); 
    getFileNames(programType).then(result => {
      const options = result.map(item => {
        return <MenuItem value={item.fileID}>{item.fileID}</MenuItem>
      });
      setMenuItems(options);
      if(result.length !== 0){
        setFile(result[0].fileID);
      }
    });
  }, [programType, deleteUpdater]);

  //Only run once when the page loads and when a file is deleted
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
    getAllCourses().then(result => {
      setCourses(result);
    });
  }, [deleteUpdater]);

  // formats the students list with all the needed data for the list
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
        
      }
      else{
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
    setTranscriptState(true);
  };

  // Update student list on file change
  useEffect(() => {
    if(file !== ""){
      const updateStudentList = async () => {
        await callGetStudents();
      }
      updateStudentList();
    }
  }, [file, yearType, customSearchVal]);


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

  const callCountAPI = async (type) => {
    let finalAPIResults = [];
    let currentIdNumber = 0;
    switch(type){
      case 'misc':  //when misc counts toggle is activated
        getCampusCounts(file).then(campusResult => {  //handles campus counts results from API
          for(let i = 0; currentIdNumber < campusResult.length; currentIdNumber++, i++) {
            campusResult[i].CountNameNotSortable = campusResult[i].countName;
            campusResult[i].CountNotSortable = campusResult[i].Count;
            campusResult[currentIdNumber].id = currentIdNumber + 1;
            finalAPIResults[finalAPIResults.length] = campusResult[currentIdNumber];

            delete campusResult[i].countName;
            delete campusResult[i].Count;
          }
          currentIdNumber++;
          finalAPIResults[finalAPIResults.length] = { id: currentIdNumber, countName: "" };
          currentIdNumber++;

          getYear(file, searchValue, yearType, userID, customSearchVal, true).then(rankResult => {  //handles rank counts results from API
            for(let i = 0; i < rankResult.length; currentIdNumber++, i++) {
              rankResult[i].CountNameNotSortable = rankResult[i].countName;
              rankResult[i].CountNotSortable = rankResult[i].Count;
              rankResult[i].id = currentIdNumber + 1;
              finalAPIResults[finalAPIResults.length] = rankResult[i];

              delete rankResult[i].countName;
              delete rankResult[i].Count;
            }
            currentIdNumber++;
            finalAPIResults[finalAPIResults.length] = { id: currentIdNumber, CountName: "" };
            currentIdNumber++;
            getCoopCounts(file).then(coopResult => {  //handles coop counts results from API
              for(let i = 0; i < coopResult.length; currentIdNumber++, i++) {
                coopResult[i].CountNameNotSortable = coopResult[i].countName;
                coopResult[i].CountNotSortable = coopResult[i].Count;
                coopResult[i].id = currentIdNumber + 1;
                finalAPIResults[finalAPIResults.length] = coopResult[i];

                delete coopResult[i].countName;
                delete coopResult[i].Count;
              }
              setCountsData(finalAPIResults);
            });
            });
        });
        break;
      case 'courses': //when course counts toggle is activated
        getCourseCounts(file).then(courseResult => {  //handles course counts results from API
          for(let i = 0; i < courseResult.length; i++) {
            courseResult[i].id = i + 1;
            courseResult[i].CountName = courseResult[i].Course;
          }
          setCountsData(courseResult);
        });
          break;
      default:
          setCountsData([{ id: 1, CountName: "Unknown" }]);
    }
  }

  const menuButtons = [
    <MenuItem><InfoPopover info={"Used to create a custom set of criteria to decide what rank each student should be."} /> <Button fullWidth="true" variant="contained" onClick={e => {setCustomSearchState(true)}}>Custom Rank</Button></MenuItem>,
    <MenuItem><InfoPopover info={"Used to load the core courses. This function only accepts XLSX files in the format shown on this site. These courses can be used to calculate rank and in the transcripts."} /> <XLSXUpload setCourseArray={callUploadCoreCoursesArr} /></MenuItem>,
    <MenuItem><InfoPopover info={"Used to delete all the files related to the currently selected File ID."} /> <DeleteButton apiFunction={deleteFile} fileIDIn={file} setUpdate={setDeleteUpdater} updateState={deleteUpdater}/></MenuItem>
  ]

  const rankRows = [
    "By Credit Hour",
    "By Start Date",
    "By Cohort",
    "By Core Course",
    "By Custom Requirements",
  ]
  //custom toolbar components for counts table
  const toolbarComponents = <ToggleButtonGroup color="primary" value={countType} exclusive onChange={(e) => {setCountsData([]); setCountType(e.target.value); callCountAPI(e.target.value)}}>
                              <ToggleButton value="misc" size="small">Misc Counts</ToggleButton>
                              <ToggleButton value="courses" size="small">Course Counts</ToggleButton> 
                              {countType === "courses" ? <GridToolbarFilterButton /> : undefined}
                            </ToggleButtonGroup>

  return (
    <Paper sx={{width: '99%'}}>
      <Modal
        open={transcriptState}
        onBackdropClick={e => setTranscriptState(false)}
      >
        <Box sx={modalStyle}>
          <Transcript rowData={modalRow} userID={userID} programIn={programType}/>
        </Box>
      </Modal>
      <Modal
        open={customSearchState}
        onBackdropClick={e => setCustomSearchState(false)}
      >
        <Box sx={modalStyle}>
          <CustomSearch courses={courses} setSearchObject={setCustomSearchVal} searchObjectIn={customSearchVal} setModalVisible={setCustomSearchState}/>
        </Box>
      </Modal>
      <XLSXSnackbar info={XLSXAlertInfo} />
      <Grid container rowSpacing={2} sx={{ pt: '1.5rem', pb: '0.75rem' }} justifyContent="center" alignItems="center" style={{textAlign:'center'}}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl>
            <InputLabel>
              Program
            </InputLabel>
            <Select
              size="small"
              value={programType}
              label="Program"
              onChange={(e) => {setFile(""); setProgramType(e.target.value)}}   
              sx={{ width: '15rem'}}
            >
              {programMenus}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl>
            <InputLabel>
              File ID
            </InputLabel>  
            <Select
              size="small"
              value={file}
              label="File ID"
              onChange={(e) => {
                setSearchValue(""); 
                setFile(e.target.value)
              }}   
              sx={{ width: '15rem' }}
            >
              {menuItems}
            </Select>
          </FormControl>  
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl>
            <InputLabel>
              Calculate Rank
            </InputLabel> 
            <Select
              size="small"
              value={yearType}
              label="Calculate Rank"
              onChange={(e) => setYearType(e.target.value)}   
              sx={{ width: '15rem' }}
              renderValue={(row) => {return rankRows[row]}}
            >
              <MenuItem value={0}><InfoPopover info={"For each 40 passed credit hours, the students rank increases."} /> By Credit Hour</MenuItem>
              <MenuItem value={3}><InfoPopover info={"Based off the courses in the XLSX file submitted in the \"Extras Menu\"."} /> By Core Course</MenuItem> 
              <MenuItem value={4}><InfoPopover info={"Based off the criteria from \"Custom Rank\" in the \"Extras Menu\"."} /> By Custom Requirements</MenuItem>  
              <MenuItem value={1}><InfoPopover info={"Counts the number of years since the student started based off the current date."} /> By Start Date</MenuItem>
              <MenuItem value={2}><InfoPopover info={"Counts the number of years since the start of the students cohort."} /> By Cohort</MenuItem> 
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MenuDropDown menuButtonsIn={menuButtons}/>
        </Grid>
      </Grid>
      <Grid container >
        <Grid item xs={12} sm={12} md={9} sx={{ pr: '1rem', pl: '1rem', pb: '1rem' }}>
          <Table names={columnsStudent} studentRows={students} doubleClickFunction={onRowDoubleClick} loadingIn={loading} enableSorting={true} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} sx={{ pr: '1rem' }}>
          <Table names={countType === "courses" ? columnsCountSortable : columnsCountNotSortable} studentRows={countsData} loadingIn={loading} toolbarButtons={toolbarComponents} />
        </Grid>
      </Grid>
    </Paper>
  );
};

//The style for the modal
const modalStyle = {
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