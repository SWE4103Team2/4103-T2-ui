import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridOverlay} from '@mui/x-data-grid';
import { LinearProgress, Box, Divider, Typography } from '@mui/material';
import { MissingStudentMakerModal } from './index.js'
import { transcriptColumns } from '../config/tablesColumns.js';
import { getEnrollment } from '../api/students';

/**
 * Transcript Table component
 * Parameters: a {} with:
 *    - rowData = A single row from the student table, formatted with atleast the columns listed in this file
 */
const TranscriptModal = ({rowData, userID, programIn}) => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
  
    // Toolbar
    const customToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  // Formats Transcript Data
  useEffect(() => {
    setLoading(true);
    getEnrollment(rowData.fileID, rowData.Student_ID, userID).then(result => {
        for(let i = 0; i < result.length; i++){
            result[i].id = i+1;
            if(result[i].isCore !== null){
              result[i].Type = "CORE";
            }
            else{
              if(result[i].Course.match(".*(COOP|PEP)")) {
                result[i].Type = "COOP";
              }
              else if (result[i].Course.match("(CSE).*")){
                result[i].Type = "CSE - HSS";
              }
              else if (result[i].Course.match("(CS|ECE).*")) {
                result[i].Type = "TE";
              }
              else if (result[i].Course.match("(APSC|ASTR|BIOL|CHE|ESCI|PHYS|SCI).*")) {
                result[i].Type = "BAS SCI";
              }
              else if (result[i].Course.match("(ENV|RCLP|SOCI|STS).*")) {
                result[i].Type = "CSE - ITS";
              }
              else if (result[i].Course.match("(ANTH|CLAS|HIST|PHIL|POLS|ARTS|HUM).*")) {
                result[i].Type = "CSE - HSS";
              }
              else if (result[i].Course.match("(ADM|ECON|ENGL|GER|JPNS|PSYC|TME).*")) {
                result[i].Type = "CSE - OPEN";
              }
              else if (result[i].Course.match("(BLCK).*")) {
                result[i].Type = "BLOCK";
              }
              else {
                result[i].Type = "CSE - MISC";
              }
            }
            if(result[i].Grade === null){
              if(result[i].Course.match(".*(COOP|PEP)")) {
                result[i].Passed = "Credit";
              }
              else{
                result[i].Passed = "In Progress";
              }
            }
            else if(result[i].Notes_Codes === '#'){
              result[i].Passed = "On Appeal";
            }
            else if(result[i].Notes_Codes === 'X'){
              result[i].Passed = "Extra";
            }
            else if(['w', 'WF', 'WD', 'D', 'F', 'NCR'].includes(result[i].Grade)) {
              result[i].Passed = "No Credit";
            }
            else{
              result[i].Passed = "Credit";
            }
            
        }
        setRows(result);
        setLoading(false);
    });
    // eslint-disable-next-line
  }, [rowData]);

  //Loading bar component
  const loadingBar = () => {
    return <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  }

  return (
    <Box sx={{ height:'79vh' }}>
      {/** Header **/}
      <Box sx={{ display: 'flex'}}>
        <Divider orientation="vertical" flexItem sx={{ mr: '1rem' }} />
        <Typography variant={"h5"}> {rowData.Name} </Typography>
        <Divider orientation="vertical" flexItem sx={{ ml: '1rem', mr: '1rem' }} />
        <Typography variant={"h5"}> {rowData.Student_ID} </Typography>
        <Divider orientation="vertical" flexItem sx={{ ml: '1rem', mr: '1rem' }} />
        <Typography variant={"h5"}> {rowData.Cohort} </Typography>
        <Divider orientation="vertical" flexItem sx={{ ml: '1rem', mr: '1rem' }} />
        <Typography variant={"h5"}>{rowData.Rank} </Typography>
        <Divider orientation="vertical" flexItem sx={{ ml: '1rem', mr: '1rem' }} />
        {rowData.Missing && <MissingStudentMakerModal rowData={rowData} programIn={programIn}/>}
      </Box>
        
      {/** Transcript Table **/}  
      <DataGrid
         rows={rows}
         columns={transcriptColumns}
         disableColumnMenu={true}
         hideFooter={false}
         rowHeight={20}
         loading={loading}
         components={{ // Uncomment this to add a filter button at the top of the table
           Toolbar: customToolbar,
           LoadingOverlay: loadingBar
         }}
      />
    </Box>
  );
}

export default TranscriptModal;