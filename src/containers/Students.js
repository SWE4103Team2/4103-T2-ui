import React, { useState, useEffect } from 'react'
import { CustomSearch, DeleteButton, InfoPopover, MenuDropDown, SelectBox, Table, AuditModal, TranscriptModal, XLSXSnackbar, XLSXUpload, MissingStudentMakerModal } from '../components';
import { largeModal } from '../config/modalStyles.js';
import { getStudents, getFileNames, getYear, getFileTypes, uploadCoreCoursesArr, getAllCourses, deleteFile, getCampusCounts, getCourseCounts, getCoopCounts } from '../api/students';
import { Paper, Grid, Button, MenuItem, Modal, Box, ToggleButton, ToggleButtonGroup, Tab, Typography, Divider, IconButton } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { studentColumns, columnsCountSortable, columnsCountNotSortable } from '../config/tablesColumns.js';
import CloseIcon from '@mui/icons-material/Close';
import { GridToolbarFilterButton } from '@mui/x-data-grid';

export const Students = ({ user }) => {
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
  const [studentItem, setStudentItem] = useState("1");
  const [customSearchState, setCustomSearchState] = useState(false);
  const [customSearchVal, setCustomSearchVal] = useState({ second: [], third: [], fourth: [], creditHoursPer: [0, 0, 0], minCoursePer: [0, 0, 0] });
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
          return <MenuItem value={item}> {item} </MenuItem>
        });
        setProgramMenus(options);
        setProgramType(result[0]);
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
    setStudentItem('1');
    setTranscriptState(true);
  };

  // Updates Student List
  useEffect(() => {
    if (file) {
      setLoading(true);
      callCountAPI(countType);
      getStudents(searchValue, file).then(result => {
        getYear(file, searchValue, yearType, userID, customSearchVal, false).then(year => {
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
    console.log(arr);
    if(arr === undefined){
      setXLSXAlertInfo([true, "Incorrect file type.", true]);
    }
    else if(Object.keys(arr).length > 0){
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
    switch(type){
      case 'misc':  //when misc counts toggle is activated
        getCampusCounts(file).then(campusResult => {  //handles campus counts results from API
          campusResult.forEach(campus => {
            campus.CountNameNotSortable = campus.countName;
            campus.CountNotSortable = campus.Count;
            delete campus.countName;
            delete campus.Count;

            finalAPIResults.push(campus);
          });

          finalAPIResults.push({ countName: "" });
          getYear(file, searchValue, yearType, userID, customSearchVal, true).then(rankResult => {  //handles rank counts results from API
            rankResult.forEach(rank => {
              rank.CountNameNotSortable = rank.countName;
              rank.CountNotSortable = rank.Count;
              delete rank.countName;
              delete rank.Count;

              finalAPIResults.push(rank);
            });

            finalAPIResults.push({ countName: "" });
            getCoopCounts(file).then(coopResult => {  //handles coop counts results from API
              coopResult.forEach(coop => {
                coop.CountNameNotSortable = coop.countName;
                coop.CountNotSortable = coop.Count;
                delete coop.countName;
                delete coop.Count;

                finalAPIResults.push(coop);
              });

              finalAPIResults.forEach((element, index) => {
                element.id = index;
              });
              setCountsData(finalAPIResults);
            });
            });
        });
        break;
      case 'courses': //when course counts toggle is activated
        getCourseCounts(file).then(courseResult => {  //handles course counts results from API
          courseResult.forEach((course, index) => {
            course.id = index + 1;
            course.CountName = course.Course;
          });
          setCountsData(courseResult);
        });
          break;
      default:
          setCountsData([{ id: 1, CountName: "Unknown" }]);
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
      <XLSXUpload setCourseArray={callUploadCoreCoursesArr} />
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
  //custom toolbar components for counts table
  const toolbarComponents = (
    <ToggleButtonGroup color="primary" value={countType} exclusive onChange={(e) => {setCountsData([]); setCountType(e.target.value); callCountAPI(e.target.value)}}>
      <ToggleButton value="misc" size="small">Misc Counts</ToggleButton>
      <ToggleButton value="courses" size="small">Course Counts</ToggleButton> 
      {countType === "courses" ? <GridToolbarFilterButton /> : undefined}
    </ToggleButtonGroup>
  );

  return (
    <>
      {/** Transcript Modal **/}
      <Modal open={transcriptState} onBackdropClick={() => setTranscriptState(false)}>          
        <Box sx={{ ...largeModal }}>
          <TabContext value={studentItem}>
            <TabList onChange={(e, n) => setStudentItem(n)}>
              {modalRow && (
                <Box sx={{ display: 'flex', mb: '0.5rem', width: '100%' }}>
                  <Typography variant={"h5"} sx={{ ml: '0.5rem' }}> {modalRow.Name} </Typography>
                  <Divider orientation="vertical" variant='middle' flexItem sx={{ backgroundColor: 'black', ml: '1rem', mr: '1rem' }} />
                  <Typography variant={"h5"}> {modalRow.Student_ID} </Typography>
                  <Divider orientation="vertical" variant='middle' flexItem sx={{ backgroundColor: 'black', ml: '1rem', mr: '1rem' }} />
                  <Typography variant={"h5"}> {modalRow.Cohort} </Typography>
                  <Divider orientation="vertical" variant='middle' flexItem sx={{ backgroundColor: 'black', ml: '1rem', mr: '1rem' }} />
                  <Typography variant={"h5"}>{modalRow.Rank} </Typography>
                  <Divider orientation="vertical" variant='middle' flexItem sx={{ backgroundColor: 'black', ml: '1rem', mr: '1rem' }} />
                  {modalRow.Missing && <MissingStudentMakerModal rowData={modalRow} programIn={programType}/>}
                </Box>
              )}
              <Tab label='Transcript' value='1' />
              <Tab label='Audit' value='2' />
            </TabList>
            <Divider />
            <TabPanel value="1" sx={{ p: 0, pt: '12px', height: '95%' }}>
              <TranscriptModal rowData={modalRow} userID={userID} />
            </TabPanel>
            <TabPanel value='2' sx={{ p: 0, pt: '12px', height: '90%' }}>
              <AuditModal fileId={file} studentId={modalRow?.Student_ID} year={modalRow.Cohort} userId={userID} />
            </TabPanel>
          </TabContext>
        </Box>
      </Modal>
          
      {/** Custom Rank Modal **/}
      <Modal open={customSearchState} onBackdropClick={() => setCustomSearchState(false)}>
        <Box sx={{ ...largeModal }}>
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

        {/** Tables **/}
        <Grid container>
          <Grid item xs={12} sm={12} md={9} sx={{ pr: '1rem', pl: '1rem', pb: '1rem' }}>
            <Table names={studentColumns} studentRows={students} doubleClickFunction={openTranscript} loadingIn={loading} enableSorting={true} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} sx={{ pr: '1rem' }}>
            <Table names={countType === "courses" ? columnsCountSortable : columnsCountNotSortable} studentRows={countsData} loadingIn={loading} toolbarButtons={toolbarComponents} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

//The style for the modal
