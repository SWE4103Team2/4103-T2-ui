import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

/**
 * CustomSearch
 */
const CustomSearch = ({courses, setModalVisible, setSearchObject, searchObjectIn}) => {
    
    const searchObject = {second: searchObjectIn.second, third: searchObjectIn.third, fourth: searchObjectIn.fourth, creditHoursPer: searchObjectIn.creditHoursPer, minCoursePer: searchObjectIn.minCoursePer};
    const minCoursePer = [searchObjectIn.second.length-searchObjectIn.minCoursePer[0], searchObjectIn.third.length-searchObjectIn.minCoursePer[1], searchObjectIn.fourth.length-searchObjectIn.minCoursePer[2]];
    
    const handleSave = () => {
        searchObject.creditHoursPer[0] = searchObject.creditHoursPer[0] <= 0                              ? 0                              : searchObject.creditHoursPer[0];
        searchObject.creditHoursPer[1] = searchObject.creditHoursPer[1] <= searchObject.creditHoursPer[0] ? searchObject.creditHoursPer[0] : searchObject.creditHoursPer[1];
        searchObject.creditHoursPer[2] = searchObject.creditHoursPer[2] <= searchObject.creditHoursPer[1] ? searchObject.creditHoursPer[1] : searchObject.creditHoursPer[2];
        searchObject.minCoursePer[0] = minCoursePer[0] >= searchObject.second.length ? 0 : searchObject.second.length-minCoursePer[0];
        searchObject.minCoursePer[1] = minCoursePer[1] >= searchObject.third.length  ? 0 : searchObject.third.length -minCoursePer[1];
        searchObject.minCoursePer[2] = minCoursePer[2] >= searchObject.fourth.length ? 0 : searchObject.fourth.length-minCoursePer[2];
        console.log(searchObject);
        setSearchObject(searchObject);
        setModalVisible(false);
    }

  // 
  return (
    <Grid container flex style={{height:'79vh'}}>
        <Grid container>
            <Grid item xs={8}>
                <Autocomplete
                    sx={{margin:3}}
                    multiple
                    options={courses.map((option) => option.Course)}
                    onChange={(e, v) => {searchObject.second = v}}
                    defaultValue={searchObjectIn.second}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Required for atleast SOP"
                    />
                    )}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField 
                    label="Allowed Duplicates for SOP" 
                    defaultValue={searchObjectIn.second.length-searchObjectIn.minCoursePer[0]} 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={(e) => {minCoursePer[0] = e.target.value}}
                    sx={{margin:3}}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField 
                    label="Required Credit Hours for SOP" 
                    defaultValue={searchObjectIn.creditHoursPer[0]} 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={(e) => {searchObject.creditHoursPer[0] = e.target.value}}
                    sx={{margin:3}}
                />
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={8}>
                <Autocomplete
                    sx={{margin:3}}
                    multiple
                    options={courses.map((option) => option.Course)}
                    onChange={(e, v) => {searchObject.third = v}}
                    defaultValue={searchObjectIn.third}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Required for atleast JUN"
                    />
                    )}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField 
                    label="Allowed Duplicates for JUN" 
                    defaultValue={searchObjectIn.third.length-searchObjectIn.minCoursePer[1]} 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={(e) => {minCoursePer[1] = e.target.value}}
                    sx={{margin:3}}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField 
                    label="Required Credit Hours for JUN" 
                    defaultValue={searchObjectIn.creditHoursPer[1]} 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={(e) => {searchObject.creditHoursPer[1] = e.target.value}}
                    sx={{margin:3}}
                />
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={8}>
                <Autocomplete
                    sx={{margin:3}}
                    multiple
                    options={courses.map((option) => option.Course)}
                    onChange={(e, v) => {searchObject.fourth = v}}
                    defaultValue={searchObjectIn.fourth}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Required for atleast SEN"
                    />
                    )}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField 
                    label="Allowed Duplicates for SEN" 
                    defaultValue={searchObjectIn.fourth.length-searchObjectIn.minCoursePer[2]} 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                    onChange={(e) => {minCoursePer[2] = e.target.value}}
                    sx={{margin:3}}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField 
                    label="Required Credit Hours for SEN" 
                    defaultValue={searchObjectIn.creditHoursPer[2]} 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                    onChange={(e) => {searchObject.creditHoursPer[2] = e.target.value}}
                    sx={{margin:3}}
                />
            </Grid>
        </Grid>  
        <Grid container>
            <Grid item xs={4} style={{textAlign:'center'}}>
                <Button variant="contained" component="span" sx={{margin:3}} onClick={e => setModalVisible(false)}> 
                    Cancel
                </Button>
            </Grid>
            <Grid item xs={4} style={{textAlign:'center'}}>
                <Button variant="contained" component="span" sx={{margin:3}} onClick={e => handleSave(e)}> 
                    Save
                </Button>
            </Grid>
            <Grid item xs={4} style={{textAlign:'center'}}>
                <Button variant="contained" component="span" sx={{margin:3}} onClick={e => {setSearchObject({second: ["CS*1073","CS*1083"], third: ["CS*1103","CS*2043","ECE*2214","ECE*2215","CS*1303","INFO*1103"], fourth: ["CS*2263","CS*2333","CS*2383","CS*2613","CS*3503","ECE*3232","STAT*2593"], creditHoursPer: [0,0,116], minCoursePer: [2,5,7]}); setModalVisible(false)}}> 
                    SWE Preset
                </Button>
            </Grid>
        </Grid>
    </Grid>
  );
}

export default CustomSearch;