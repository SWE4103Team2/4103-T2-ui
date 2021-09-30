import React, { useEffect, useState } from 'react';
import {
  Table as MTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Input,
  Button
} from '@mui/material';

import { uploadFile } from '../api/upload';

// We can adjust this to take in props
// Such as the api call we want to make
// Therefore making it reusable on all pages.
// If someone gets here before I can adjust this,
// Just send me a msg - Robert
const Table = () => {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState(null);
  const [header, setHeader] = useState([]);
  const [body, setBody] = useState([]);

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

    if (rows) {
      const h = (
        <TableRow>
          {rows[0].map(item => {
            return <TableCell> {item} </TableCell>;
          })}
        </TableRow>
      );
      const b = rows.slice(1).map(items => {
        return (
          <TableRow>
            {items.map(item => {
              return <TableCell> {item} </TableCell>
            })}
          </TableRow>
        );
      });

      setHeader(h);
      setBody(b);
    }
  }, [rows]);


  return (
    <>
      <label>
        <Input
          sx={{ display: 'none' }}
          onChange={e => setFile(e.target.files[0])}
          accept="text/plain"
          type="file"
        />
        <Button variant="contained" component="span"> 
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
    </>
  );
}

export default Table;