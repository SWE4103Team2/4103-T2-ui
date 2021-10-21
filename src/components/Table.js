import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';

const Table = ({studentRows, names, doubleClickFunction}) => {
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
    <div style={{height:'79vh'}}>
      <DataGrid
         rows={rows}
         columns={names}
         disableColumnMenu={true}
         hideFooter={false}
         autoPageSize
         onRowDoubleClick={e => {doubleClickFunction(e.row)}}
         rowHeight={20}
         components={{ // Uncomment this to add a filter button at the top of the table
           Toolbar: customToolbar
         }}
      />
    </div>
  );
}

export default Table;