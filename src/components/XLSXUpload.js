import React, { useState, useEffect } from 'react'
import { Box, Input, Button } from '@mui/material';
import XLSX from 'xlsx';

export const XLSXUpload = ({setCourseArray}) => {
  const [file, setFile] = useState(null);

  const handleFile = async (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        /* Parse data */
        const ab = e.target.result;
        const wb = XLSX.read(ab, {type:'array'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {header:1});
        /* Update state */
        setCourseArray(parseData(data))

    };
    reader.readAsArrayBuffer(file);
  }

  const parseData = (dataIn) => {
    let output = [];
    let curID;
    //find start row of courses
    let i = 0;
    for(; i < dataIn.length && dataIn[i][0] !== "TERM 1"; i++);
    i++;
    while(dataIn[i][0] !== undefined){
        for(let j = 0; j < dataIn[i].length; j += 2){
            if(dataIn[i][j] !== undefined){
                curID = correctCourseID(dataIn[i][j]);
                if(curID !== null){
                   output.push(curID); 
                }
            }
            if(dataIn[i+1][j] !== undefined && dataIn[i+1][j].startsWith("or ")){
                curID = correctCourseID(dataIn[i+1][j].substring(3));
                if(curID !== null){
                   output.push(curID); 
                }
            }
        }
        i += 5;
    };
    return output;
  };

  const correctCourseID = (crsID) => {
    let numStartIndex = crsID.search(/\d/);
    if(numStartIndex === -1){
        return null;
    }
    if(crsID[numStartIndex-1] !== ' '){
        return crsID.slice(0, numStartIndex) + '*' + crsID.slice(numStartIndex, numStartIndex+4);
    }
    return crsID.slice(0, numStartIndex-1) + '*' + crsID.slice(numStartIndex, numStartIndex+4);
  };

  useEffect(() => {
    const upload = async () => {
      await handleFile(file);
      setFile(null);
    };

    if (file) {
      upload();
    }
    // eslint-disable-next-line
  }, [file]);

  return (
    <Box display='flex'>
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
          sx={{ height: '100%' }}
        > 
          Upload XLSX File
        </Button>
      </label>
    </Box>
  );
};