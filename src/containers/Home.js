import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export const Home = () => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      console.log(file); // Here we can call an function which sends the file to the API.
    }
  }, [file]);

  return (
    <Container maxWidth="false">
      <Grid container justifyContent="center">
        <Stack spacing={2} sx={{ marginTop: '7.5rem', width: '10rem' }}>
          <Button variant="contained"> Program Coordinator </Button>
          <Button variant="contained"> Accreditation Coordinators </Button>
          <Button variant="contained"> Program Advisors </Button>
        </Stack>
      </Grid>
      <Grid> {/* Testing file uploading here. */}
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
      </Grid>
    </Container>
  );
};