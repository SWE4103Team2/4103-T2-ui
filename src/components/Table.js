import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridOverlay} from '@mui/x-data-grid';
import { LinearProgress, Button } from '@mui/material';
import { isMobile } from 'react-device-detect';

/**
 * Student Table component
 * Parameters: a {} with:
 *    - studentRows = list of students from the API, formatted with atleast the columns of name
 *    - name = the column headers
 *    - doubleClickFunction = a function that dictates what should happen when a row is double clicked
 *    - loadingIn = if the table should display the loading indicator or not
 *    - toolbarButtons = toolbar functionality - can now add specific buttons to toolbar
 *    - enableSorting = not currently inuse but the functionality is there
 */
const Table = ({studentRows, names, doubleClickFunction, loadingIn, toolbarButtons, enableSorting}) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  //Loading bar component
  const loadingBar = () => {
    return <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  }

  //toolbar component
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
  
  // Sets the rows variable with the "studentRows" parameter
  useEffect(() => {
    setRows(studentRows);
  }, [studentRows]);

  // sets if it should display loading or not
  useEffect(() => {
    setLoading(loadingIn);
  }, [loadingIn]);

  //returns the table
  //If the user is on mobile they only need to click the row once and the rows aer a bit bigger, on browser they need to click twice and rows are smaller
  return (
    <div style={{height:'79vh'}}>
      {isMobile ?
      <DataGrid
         rows={rows}
         columns={names}
         disableColumnMenu={true}
         hideFooter={false}
         autoPageSize
         onRowClick={doubleClickFunction !== undefined ? e => doubleClickFunction(e.row) : () => {}}
         rowHeight={30}
         loading={loading}
         components={{
           Toolbar: customToolbar,
           LoadingOverlay: loadingBar
         }}
      />
      :
      <DataGrid
         rows={rows}
         columns={names}
         disableColumnMenu={true}
         hideFooter={false}
         autoPageSize
         onRowDoubleClick={doubleClickFunction !== undefined ? e => doubleClickFunction(e.row) : () => {}}
         rowHeight={20}
         loading={loading}
         components={{
           Toolbar: customToolbar,
           LoadingOverlay: loadingBar
         }}
      />}
    </div>
  );
}

export default Table;