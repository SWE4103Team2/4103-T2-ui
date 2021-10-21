import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import { getEnrollment } from '../api/students';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const Transcript = ({rowData}) => {
  
    const columns = [
        {field: 'Course',     headerName: 'Course ID',    flex: 1,    align: "center", headerAlign: "center"},
        {field: 'Grade',      headerName: 'Grade',        flex: 1,    align: "center", headerAlign: "center"},
        {field: 'Term',       headerName: 'Term',         flex: 1,    align: "center", headerAlign: "center"},
        {field: 'Section',    headerName: 'Section',      flex: 1,    align: "center", headerAlign: "center"},
        {field: 'Title',      headerName: 'Title',        flex: 1,    align: "center", headerAlign: "center"},
        {field: 'Credit_Hrs', headerName: 'Credit Hours', flex: 1,    align: "center", headerAlign: "center"},
    ]

    const [rows, setRows] = useState([]);

  const customToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }
  
  // Sets the rows variable with the "studentRows" parameter
  useEffect(() => {
    getEnrollment(rowData.fileID, rowData.Student_ID).then(result => {
        for(let i = 0; i < result.length; i++){
            result[i].id = i+1;
        }
        setRows(result);
    });
  }, [rowData]);

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
         onRowDoubleClick={e => {}}
         rowHeight={20}
         components={{ // Uncomment this to add a filter button at the top of the table
           Toolbar: customToolbar
         }}
      />
    </div>
  );
}

export default Transcript;