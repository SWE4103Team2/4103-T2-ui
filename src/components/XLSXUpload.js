import React, { useState, useEffect } from 'react'
import { Box, Input, Button } from '@mui/material';
import XLSX from 'xlsx';

export const XLSXUpload = ({setCourseArray}) => {
  const [file, setFile] = useState(null);

  /**
   * This reads the XLSX file into a JSON, i dont know whats going on here i just snatched it from the website, but it works
   */
  const handleFile = async (file) => {
    try{
      if(file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2).toUpperCase() !== "XLSX"){
        setCourseArray(undefined);
        return;
      }
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
          setCourseArray(parseData2(data))

      };
      reader.readAsArrayBuffer(file);
    }
    catch (err){
      setCourseArray(undefined);
      return;
    }
  }
  /** 
   * Haha, so this is a bit of a trash function but the file it reads is also wack
   * The way its setup is kind of good at reading different tables, but not really, read on to see
   * It might be best to have the file open while reading this function
  */
  const parseData = (dataIn) => {
    let output = [];
    let curID;
    let i = 0;
    // This checks each line for the start of the actual table, then moves to the next line where the actual courses are
    for(; i < dataIn.length && dataIn[i][0] !== "TERM 1"; i++); 
    i++;
    // This checks every 5th row until an empty row is found, the file is set up where the course Ids are spaced out by 5 rows
    while(dataIn[i].length !== 0){                 
      //Goes through the rows checking every second column, the course IDs are spaced out by 2 columns             
      for(let j = 0; j < dataIn[i].length; j += 2){           
        // checks if theres a ID on that position
        if(dataIn[i][j] !== undefined){                     
          //formates the tag
          curID = correctCourseID(dataIn[i][j]);          
          //If that position was valid it adds it to the output
          if(curID !== null){                             
            output.push(curID); 
          }
        }
        //Checks the line below to see if you choose between 2 classes
        //This is currently only formated to pick up lines that start with "or ", i think there are other matrixes that use "/" and there are probably ones that use things other than that
        if(dataIn[i+1][j] !== undefined && dataIn[i+1][j].startsWith("or ")){
          //formates the tag removing the start part
          curID = correctCourseID(dataIn[i+1][j].substring(3));
          //If that position was valid (which is probably will be at this point) it adds it to the output
          if(curID !== null){
              output.push(curID); 
          }
        }
      }
      i += 5;
    };
    return output;
  };

  /** 
   * A more versitile function than the one above
   * about 2x slower (although thats 0.20ms for the old and 0.40ms for the new, so this is better)
   * This function checks every element of the XLSX file, so might be slower than above
   * This uses regex to find every course
   * it actually finds every instance where there is 1-4 letters (not case sensitive) then a single optional space (change the ? after \s to * to have any number of spaces) then 4 numbers
  */
  const parseData2 = (dataIn) => {
    let output = [];
    let curID;
    let matches;
    //Loop through every element
    for(let i = 0, iSize = dataIn.length, j, jSize; i < iSize; i++){
      for(j = 0, jSize = dataIn[i].length; j < jSize; j++){
        //ensure the element exists
        if(dataIn[i][j] !== undefined){
          //ensure the element is a string (regex errors otherwise)
          if(typeof dataIn[i][j] === "string"){
            //grab all the matches (doesnt reuse characters)
            matches = dataIn[i][j].match(/(^|[^A-Za-z])[A-Za-z]{1,4}\s?\d{4}/);
            //ensures matches were found
            if(matches){
              //loops through every match
              matches.forEach((course) => {
                //formates the tag removing the start part
                curID = correctCourseID(course.trim());
                //If that position was valid (which is probably will be at this point) it adds it to the output          
                if(curID !== null){                             
                  output.push(curID); 
                }
              });
            }
          }
        }
      }
    }
    return output;
  }

  /**
   * This function is used to help the above one
   * This formats the course id to the same style we use in the database
   */
  const correctCourseID = (crsID) => {
    //find the start of the course number
    let numStartIndex = crsID.search(/\d/);
    //if there is no course number return null, as its not a course (Probably, hopefully)
    if(numStartIndex === -1){
        return null;
    }
    //Cover the edge case where the engg courses arent titled correctly, this is the only one i noticed wrong
    if(crsID.startsWith("ENG") && crsID[3] !== 'G'){
      crsID = crsID.slice(0, 3) + 'G' + crsID.slice(3, crsID.length);
      numStartIndex++;
    }
    //If theres not space between the number and the course type put a * there
    if(crsID[numStartIndex-1] !== ' '){
        return crsID.slice(0, numStartIndex) + '*' + crsID.slice(numStartIndex, numStartIndex+4);
    }
    //If theres a space between the number and the course type replace it with a *
    return crsID.slice(0, numStartIndex-1) + '*' + crsID.slice(numStartIndex, numStartIndex+4);
  };

  /**
   * handles file input
   */
  useEffect(() => {
    if (file) {
      const upload = async () => {
        await handleFile(file);
        setFile(null);
      };
      upload();
    }
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
          fullWidth="true" 
        > 
          Upload XLSX File
        </Button>
      </label>
    </Box>
  );
};