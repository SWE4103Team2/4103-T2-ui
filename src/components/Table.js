import React, { useEffect, useState } from 'react';
import MTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

import { uploadFile } from '../api/upload';

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