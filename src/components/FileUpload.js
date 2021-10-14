import React, { useState, useEffect } from 'react'
import { Box, TextField, Input, Button } from '@mui/material';

export const FileUpload = ({ apiFunction }) => {
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const upload = async () => {
      const data = await apiFunction(fileName, file);
      console.log(data);
      setFile(null);
    };

    if (fileName && file) {
      upload();
    }
    // eslint-disable-next-line
  }, [file]);

  return (
    <Box display='flex'>
      <TextField
        size="small"
        placeholder='File Name'
        onChange={e => setFileName(e.target.value)}
        sx={{ mr: '0.5rem' }} />
      <label>
        <Input
          sx={{ display: 'none' }}
          onClick={e => e.target.value = null}
          onChange={e => setFile(e.target.files[0])}
          accept="text/plain"
          type="file"
        />
        <Button
          variant="contained"
          component="span"
          disabled={!fileName}
          sx={{ height: '100%' }}
        > 
          Upload File
        </Button>
      </label>
    </Box>
  );
};