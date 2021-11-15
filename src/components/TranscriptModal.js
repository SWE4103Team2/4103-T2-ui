import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, GridOverlay } from '@mui/x-data-grid';
import { LinearProgress, Box, Grid, Divider, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MissingStudentMakerModal } from './index.js'
import { transcriptColumns } from '../config/tablesColumns.js';
import { getEnrollment } from '../api/students';

/**
 * Transcript Table component
 * Parameters: a {} with:
 *    - rowData = A single row from the student table, formatted with atleast the columns listed in this file
 */
const TranscriptModal = ({closeModal, rowData, userID, programIn }) => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
  
    // Toolbar
    const customToolbar = () => {
    return (
      <GridToolbarContainer>    
        <Grid container> 
          <Grid item xs={11.5}>
            <Box sx={{ display: 'flex', mb: '0.5rem', width: '100%' }}>
              <Typography variant={"h5"} sx={{ ml: '0.5rem' }}> {rowData.Name} </Typography>
              <Divider orientation="vertical" flexItem sx={{ ml: '1rem', mr: '1rem' }} />
              <Typography variant={"h5"}> {rowData.Student_ID} </Typography>
              <Divider orientation="vertical" flexItem sx={{ ml: '1rem', mr: '1rem' }} />
              <Typography variant={"h5"}> {rowData.Cohort} </Typography>
              <Divider orientation="vertical" flexItem sx={{ ml: '1rem', mr: '1rem' }} />
              <Typography variant={"h5"}>{rowData.Rank} </Typography>
              <Divider orientation="vertical" flexItem sx={{ ml: '1rem', mr: '1rem' }} />
              {rowData.Missing && <MissingStudentMakerModal rowData={rowData} programIn={programIn}/>}
            </Box>
          </Grid>
          <Grid item justifyContent='flex-end' xs={0.5} sx={{ width: '100%' }}>
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs={11}>
            <GridToolbarFilterButton />
          </Grid>
          <Grid item xs={1} justifyContent='flex-end'>
            <GridToolbarExport
              csvOptions={{ fileName: `${rowData.Name.replace(/\s/g, '_')}_${rowData.Student_ID}` }}
              printOptions={{ fileName: `${rowData.Name.replace(/\s/g, '_')}_${rowData.Student_ID}` }} />
          </Grid>
        </Grid>
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
    <Box sx={{ height:'100%' }}>
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