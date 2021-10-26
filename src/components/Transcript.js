import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridOverlay} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { getEnrollment } from '../api/students';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

/**
 * Transcript Table component
 * Parameters: a {} with:
 *    - rowData = A single row from the student table, formatted with atleast the columns listed in this file
 */
const Transcript = ({rowData}) => {
  
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);

    //List of columns
    const columns = [
        {field: 'Course',     headerName: 'Course ID',    flex: 1,    align: "center", headerAlign: "center"},
        {field: 'Grade',      headerName: 'Grade',        flex: 1,    align: "center", headerAlign: "center"},
        {field: 'Term',       headerName: 'Term',         flex: 1,    align: "center", headerAlign: "center"},
        {field: 'Section',    headerName: 'Section',      flex: 1,    align: "center", headerAlign: "center"},
        {field: 'Title',      headerName: 'Title',        flex: 3,    align: "center", headerAlign: "center"},
        {field: 'Credit_Hrs', headerName: 'Credit Hours', flex: 1,    align: "center", headerAlign: "center"},
    ];
  
    //toolbar component
  const customToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }
  
  // Turns on the loading indicator
  // gets the enrollment data from the API for the inputted student
  // updates the table
  // turns off the loading indicator
  useEffect(() => {
    setLoading(true);
    getEnrollment(rowData.fileID, rowData.Student_ID).then(result => {
        for(let i = 0; i < result.length; i++){
            result[i].id = i+1;
        }
        setRows(result);
        setLoading(false);
    });
  }, [rowData]);

  //Loading bar component
  const loadingBar = () => {
    return <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  }

  // returns the table, with the student name in the top left
  return (
    <div style={{height:'79vh'}}>
        <Box sx={{
          display: 'flex',
          '& hr': {
            mx: 2,
          }}}>
            <Typography variant={"h5"}>{rowData.Name}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant={"h5"}>{rowData.Student_ID}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant={"h5"}>{rowData.Cohort}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant={"h5"}>{rowData.Rank}</Typography>
        </Box>
        
      <DataGrid
         rows={rows}
         columns={columns}
         disableColumnMenu={true}
         hideFooter={false}
         autoPageSize
         rowHeight={20}
         loading={loading}
         components={{ // Uncomment this to add a filter button at the top of the table
           Toolbar: customToolbar,
           LoadingOverlay: loadingBar
         }}
      />
    </div>
  );
}

export default Transcript;