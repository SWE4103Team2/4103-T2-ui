import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';

const Table = ({studentRows, names}) => {
  const [file, setFile] = useState(null);
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
    setRows(studentRows);
  }, [studentRows]);


  return (
    <div style={{height:'40pc'}}>
      <label>
        <Input
          sx={{ display: 'none' }}
          onChange={e => setFile(e.target.files[0])}
          accept="text/plain"
          type="file"
        />
        {/* Commenting out the button for now until we figure out where we want the upload process to occur.*/}
        {/* <Button variant="contained" component="span" disabled='true' startIcon={<UploadFileIcon />} sx={{
          marginBottom:'10px',
          marginLeft: '18px'
        }} > 
          Upload File
        </Button> */}
      </label>
      <DataGrid
         rows={rows}
         columns={names}
         disableColumnMenu={true}
         hideFooter={false}
         autoPageSize
         onRowDoubleClick
         rowHeight={20}
         components={{ // Uncomment this to add a filter button at the top of the table
           Toolbar: customToolbar
         }}
      />
    </div>
  );
}

export default Table;