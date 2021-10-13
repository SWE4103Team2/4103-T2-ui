import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
} from '@mui/material';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';


// We can adjust this to take in props
// Such as the api call we want to make
// Therefore making it reusable on all pages.
// If someone gets here before I can adjust this,
// Just send me a msg - Robert
const Table = ({studentRows, names}) => {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);

  console.log(studentRows);
  console.log(names);

  /*
    A custom toolbar for the datagrid table. 
  */
  const customToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    setRows(studentRows);
  }, [studentRows]);


  return (
    <div style={{height:'43.6pc'}}>
      <label>
        <Input
          sx={{ display: 'none' }}
          onChange={e => setFile(e.target.files[0])}
          accept="text/plain"
          type="file"
        />
        <Button variant="contained" component="span" disabled='true' startIcon={<UploadFileIcon />} sx={{
          marginBottom:'10px',
          marginLeft: '18px'
        }} > 
          Upload File
        </Button>
      </label>
      <DataGrid
         rows={rows}
         columns={names}
         disableColumnMenu={true}
         hideFooter={true}
        //  components={{ // Uncomment this to add a filter button at the top of the table
        //    Toolbar: customToolbar
        //  }}
      />
    </div>
  );
}

export default Table;