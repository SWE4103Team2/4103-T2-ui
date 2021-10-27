import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridOverlay} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

/**
 * Student Table component
 * Parameters: a {} with:
 *    - studentRows = list of students from the API, formatted with atleast the columns of name
 *    - name = the column headers
 *    - doubleClickFunction = a function that dictates what should happen when a row is double clicked
 *    - loadingIn = if the table should display the loading indicator or not
 */
const Table = ({studentRows, names, doubleClickFunction, loadingIn}) => {
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
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
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
  return (
    <div style={{height:'79vh'}}>
      <DataGrid
         rows={rows}
         columns={names}
         disableColumnMenu={true}
         hideFooter={false}
         autoPageSize
         onRowDoubleClick={e => {doubleClickFunction(e.row)}}
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

export default Table;