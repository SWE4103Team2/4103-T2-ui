import React, { useEffect, useState } from 'react';
import {
  Table as MTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Input,
  Button,
  Box
} from '@mui/material';

import { uploadFile } from '../api/upload';

// We can adjust this to take in props
// Such as the api call we want to make
// Therefore making it reusable on all pages.
// If someone gets here before I can adjust this,
// Just send me a msg - Robert
const Table = ({studentRows, names}) => {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState(null);
  const [header, setHeader] = useState([]);
  const [body, setBody] = useState([]);

  console.log(studentRows);

  const getPropertiesOfRow = (row) => {
    const prop = [];
    for(let cell in row) {
        console.log(row[cell]);
        prop.push(row[cell]);
    }     
    return prop;
}

  useEffect(() => {
    if (file) {
      const upload = async () => {
        const data = await uploadFile(file)
        setRows(data);
      };

      upload();
    };
  }, [file])

  useEffect(() => {
    console.log(rows);

      const h = (
        <TableRow>
          {names.map(item => {
            return <TableCell> {item} </TableCell>;
          })}
        </TableRow>
      );
      const b = studentRows.map(row => {
                let rowProperties = getPropertiesOfRow(row);
                return <TableRow>
                  {rowProperties.map(cell => {
                    return <TableCell>{cell}</TableCell>})}
                </TableRow>
            });

// file ? rows.slice(1).map(items => {
//   <TableRow>
//     {items.map(item => {
//       return <TableCell> {item} </TableCell>
//     })}
//   </TableRow>
// }) : 

      setHeader(h);
      setBody(b);
    }
  , [studentRows]);


  return (
    <>
    <Box maxWidth="1600px" minWidth="1400px" height='400pc' sx={{
      backgroundColor: 'white'
    }}>
      <label>
        <Input
          sx={{ display: 'none' }}
          onChange={e => setFile(e.target.files[0])}
          accept="text/plain"
          type="file"
        />
        <Button variant="contained" component="span" disabled='true' > 
          Upload File
        </Button>
      </label>
      <TableContainer>
        <MTable>
          <TableHead>
            {header}
          </TableHead>
          <TableBody>
            {body}
          </TableBody>
        </MTable>
      </TableContainer>
      </Box>
    </>
  );
}

export default Table;