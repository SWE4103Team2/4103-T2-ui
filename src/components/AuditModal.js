import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { getAudit } from '../api/students';

const AuditModal = ({ fileId, studentId, year, userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (fileId && studentId && year && userId) {
      getAudit({ fileId, studentId, year: year.substring(0,7), userId }).then(result => {
        setData(result);
      });
    } 
    // eslint-disable-next-line
  }, [fileId, studentId, userId])

  return (
    <Box component='div' sx={{ boxShadow: 2, p:'1rem', overflowX: 'hidden', overflowY: 'scroll', height: '100%' }}>
      {/* Core Courses */}
      <Grid container display='flex'>
        <Grid item xs={4}>
          <Typography variant='h5'> Core Courses </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Current [ {data?.core?.completed.length} Courses | {data?.core?.ccr} CH ] </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Required [ {data?.core?.completed.length + data?.core?.progress.length + data?.core?.required.length} Courses | {data?.core?.cr} CH ] </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: '1rem', backgroundColor: 'black' }} />
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Completed: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.core?.completed?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> In Progress: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.core?.progress?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Remaining: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.core?.required?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>

      {/* TE Courses */}
      <Grid container display='flex' sx={{ mt: '2rem' }}>
        <Grid item xs={4}>
          <Typography variant='h5'> TE Courses </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Current [ {data?.te?.completed.length} Courses | {data?.te?.ccr} CH ] </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Required [ 4 Courses | 14 CH ] </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: '1rem', backgroundColor: 'black' }} />
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Completed: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.te?.completed?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> In Progress: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.te?.progress?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Remaining: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.te?.required?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>

      {/* NS Courses */}
      <Grid container display='flex' sx={{ mt: '2rem' }}>
        <Grid item xs={4}>
          <Typography variant='h5'> NS Courses </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Current [ {data?.ns?.completed.length} Courses | {data?.ns?.ccr} CH ] </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Required [ 2 Courses | 5 CH ] </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: '1rem', backgroundColor: 'black' }} />
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Completed: </Typography>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Completed: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.ns?.completed?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> In Progress: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.ns?.progress?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Remaining: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.ns?.required?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>

      {/* CSE Courses */}
      <Grid container display='flex' sx={{ mt: '2rem' }}>
        <Grid item xs={4}>
          <Typography variant='h5'> CSE Courses </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Current [ {data?.cse?.completed.length} Courses | {data?.cse?.ccr} CH ] </Typography>
        </Grid>
        <Grid item justifyContent='flex-end' xs={4}>
          <Typography variant='h5' align='right'> Required [ 3 Courses | 9 CH ] </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: '1rem', backgroundColor: 'black' }} />
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Completed: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.cse?.completed?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> In Progress: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.cse?.progress?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>
      <Typography variant='h8' sx={{ textDecoration: 'underline' }}> Remaining: </Typography>
      <Box display='flex' sx={{ flexFlow: 'wrap', width: '100%', mb: '2rem' }}>
        {data?.cse?.required?.map(i => <Box sx={{ width: '25%', mr: '2rem' }}> {i} </Box>)}
      </Box>
    </Box>
  );
}

export default AuditModal;