import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

/**
 * CustomSearch Table component
 * Parameters: a {} with:
 *    - rowData = A single row from the student table, formatted with atleast the columns listed in this file
 */
const CustomSearch = ({setModalVisible, setSearchObject, searchObjectIn}) => {
    
    const searchObject = {second: searchObjectIn.second, third: searchObjectIn.third, fourth: searchObjectIn.fourth};
    const courses = [{Course: "CS*2333"},{Course: "CS*5333"},{Course: "CS*7333"},{Course: "CS*2363"},{Course: "CS*2353"},{Course: "CS*2334"},]

    const handleSave = () => {
        searchObject.creditHoursPer = [0,0,0];
        searchObject.minCoursePer = [searchObject.second.length, searchObject.third.length, searchObject.fourth.length];
        console.log(searchObject);
        setSearchObject(searchObject);
        setModalVisible(false);
    }

    const handleSecond = (v) => {
        searchObject.second = v;
    }

    const handleThird = (v) => {
        searchObject.third = v;
    }

    const handleFourth = (v) => {
        searchObject.fourth = v;
    }

  // returns the table, with the student name in the top left
  return (
    <div style={{height:'79vh'}}>
        <Box sx={{
          display: 'flex',
          '& hr': {
            mx: 2,
          }}}>
        </Box>
        
        <Autocomplete
        multiple
        options={courses.map((option) => option.Course)}
        onChange={(e, v) => handleSecond(v)}
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
            label="Required for 2nd Year"
          />
        )}
      />
      <Autocomplete
        multiple
        options={courses.map((option) => option.Course)}
        onChange={(e, v) => handleThird(v)}
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
            label="Required for 3nd Year"
          />
        )}
      />
      <Autocomplete
        multiple
        options={courses.map((option) => option.Course)}
        onChange={(e, v) => handleFourth(v)}
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
            label="Required for 4nd Year"
          />
        )}
      />
      <Button variant="contained" component="span" sx={{marginLeft:3}} onClick={e => setModalVisible(false)}> 
            Discard
          </Button>
      <Button variant="contained" component="span" sx={{marginLeft:3}} onClick={e => handleSave(e)}> 
            Save
          </Button>
    </div>
  );
}

export default CustomSearch;