import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridOverlay} from '@mui/x-data-grid';
import { LinearProgress, Button, Box } from '@mui/material';
import { isMobile } from 'react-device-detect';

/**
 * Student Table component
 * Parameters: a {} with:
 *    - studentRows = list of students from the API, formatted with atleast the columns of name
 *    - name = the column headers
 *    - doubleClickFunction = a function that dictates what should happen when a row is double clicked (default value = the function (() => null))
 *    - loadingIn = if the table should display the loading indicator or not
 *    - toolbarButtons = toolbar functionality - can now add specific buttons to toolbar
 *    - enableSorting = not currently inuse but the functionality is there
 */
const Table = ({studentRows, names, doubleClickFunction = () => null, loadingIn, toolbarButtons, enableSorting}) => {
  const [rows, setRows] = useState([]);

  //Loading Bar
  const loadingBar = () => {
    return <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  }

  // Toolbar
  const customToolbar = () => {
    return (
        toolbarButtons === undefined ? 
          <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarColumnsButton />
          </GridToolbarContainer>
          : 
          <GridToolbarContainer>
            {toolbarButtons}
          </GridToolbarContainer>
    );
  }
  
  // Sets Student Data
  useEffect(() => {
    setRows(studentRows);
  }, [studentRows]);

  return (
    <Box sx={{ height:'79vh' }}>
      <DataGrid
         rows={rows}
         columns={names}
         disableColumnMenu={true}
         hideFooter={false}
         autoPageSize
         onRowClick={(e) => doubleClickFunction(e.row)}
         rowHeight={isMobile ? 30 : 20}
         loading={loadingIn}
         components={{
           Toolbar: customToolbar,
           LoadingOverlay: loadingBar
         }}
      />
    </Box>
  );
}

export default Table;