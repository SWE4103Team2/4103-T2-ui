import React, { useEffect } from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { getAudit } from '../api/students';

const AuditModal = ({ fileId, studentId, year, userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAudit({ fileId, studentId, year, userId }).then(result => {
      console.log(result);
      setData(result);
    });
  }, [])

  return (
    <Box component='div' sx={{ boxShadow: 2, p:'1rem', overflowY: 'scroll', height: '100%' }}>

      {/* Core Courses */}
      <Grid container display='flex'>
        <Grid item xs={4}>
          <Typography variant='h5'> Core Courses </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Current [ 2 Courses | 8 CH ] </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Required [ 12 Courses | 82 CH ] </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: '1rem', backgroundColor: 'black' }} />
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Completed: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        C {data?.core?.completed}
      </Typography>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> In Progress: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        P {data?.core?.progress}
      </Typography>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Remaining: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        R {data?.core?.required}
      </Typography>

      {/* TE Courses */}
      <Grid container display='flex' sx={{ mt: '2rem' }}>
        <Grid item xs={4}>
          <Typography variant='h5'> TE Courses </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Current [ 2 Courses | 8 CH ] </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Required [ 12 Courses | 82 CH ] </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: '1rem', backgroundColor: 'black' }} />
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Completed: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        C {data?.te?.completed}
      </Typography>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> In Progress: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        P {data?.te?.progress}
      </Typography>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Remaining: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        R {data?.te?.required}
      </Typography>

      {/* NS Courses */}
      <Grid container display='flex' sx={{ mt: '2rem' }}>
        <Grid item xs={4}>
          <Typography variant='h5'> NS Courses </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Current [ 2 Courses | 8 CH ] </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Required [ 12 Courses | 82 CH ] </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: '1rem', backgroundColor: 'black' }} />
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Completed: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        C {data?.ns?.completed}
      </Typography>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> In Progress: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        P {data?.ns?.progress}
      </Typography>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Remaining: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        R {data?.ns?.required}
      </Typography>

      {/* CSE Courses */}
      <Grid container display='flex' sx={{ mt: '2rem' }}>
        <Grid item xs={4}>
          <Typography variant='h5'> CSE Courses </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Current [ 2 Courses | 8 CH ] </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Required [ 12 Courses | 82 CH ] </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: '1rem', backgroundColor: 'black' }} />
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Completed: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        C {data?.cse?.completed}
      </Typography>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> In Progress: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        P {data?.cse?.progress}
      </Typography>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Remaining: </Typography>
      <Typography variant='h8' display='block' gutterBottom>
        R {data?.cse?.required}
      </Typography>
    </Box>
  );
}

export default AuditModal;