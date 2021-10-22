import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridOverlay} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

const Table = ({studentRows, names, doubleClickFunction, loadingIn}) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadingBar = () => {
    return <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  }

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

  useEffect(() => {
    setLoading(loadingIn);
  }, [loadingIn]);

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