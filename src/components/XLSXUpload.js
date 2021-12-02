import React, { useState, useEffect } from 'react'
import { Box, Input, Button } from '@mui/material';
import XLSX from 'xlsx';

const XLSXUpload = ({ setCourseArray }) => {
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
          
          /* Get all worksheets */
          const returnJSON = {};
          if(wb.SheetNames.includes("prereqs")){
            returnJSON["prereqs"] = parsePrereq(XLSX.utils.sheet_to_json(wb.Sheets["prereqs"], { header:1 }));
            wb.SheetNames.splice(wb.SheetNames.indexOf("prereqs"), 1);
          }
          if(wb.SheetNames.includes("valid-tags")){
            returnJSON["valid-tags"] = parseVaildTags(XLSX.utils.sheet_to_json(wb.Sheets["valid-tags"], { header:1 }));
            wb.SheetNames.splice(wb.SheetNames.indexOf("valid-tags"), 1)
          }
          if(wb.SheetNames.includes("exceptions")){
            returnJSON["exceptions"] = parseExceptions(XLSX.utils.sheet_to_json(wb.Sheets["exceptions"], { header:1 }));
            wb.SheetNames.splice(wb.SheetNames.indexOf("exceptions"), 1)
          }
          if(wb.SheetNames.includes("replacements")){
            returnJSON["replacements"] = parseReplacements(XLSX.utils.sheet_to_json(wb.Sheets["replacements"], { header:1 }));
            wb.SheetNames.splice(wb.SheetNames.indexOf("replacements"), 1)
          }
          if(wb.SheetNames.includes("course-groups")){
            returnJSON["course-groups"] = parseGroups(XLSX.utils.sheet_to_json(wb.Sheets["course-groups"], { header:1 }));
            wb.SheetNames.splice(wb.SheetNames.indexOf("course-groups"), 1)
          }

          const data = {}; 
          let total = [];
          wb.SheetNames.forEach(sheetName => {
            data[sheetName] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header:1 });
            total = total.concat(parseMatrix(data[sheetName], sheetName));
          });
          /* Update state */
          returnJSON["matrixes"] = total;
          setCourseArray(returnJSON);

      };
      reader.readAsArrayBuffer(file);
    }
    catch (err){
      setCourseArray(undefined);
      return;
    }
  }

  /** 
   * A more versitile function than the one above
   * about 2x slower (although thats 0.20ms for the old and 0.40ms for the new, so this is better)
   * This function checks every element of the XLSX file, so might be slower than above
   * This uses regex to find every course
   * it actually finds every instance where there is 1-4 letters (not case sensitive) then a single optional space (change the ? after \s to * to have any number of spaces) then 4 numbers
  */
   const parseMatrix = (dataIn, sheetName) => {
    let output = [];

    for(let i = 0, iSize = dataIn.length; i < iSize; i++){
      for(let j = 0, jSize = dataIn[i].length; j < jSize; j++){
        if(dataIn[i][j] !== undefined){
          if(typeof dataIn[i][j] === "string"){
            if(dataIn[i][j].startsWith("or ")) continue;  
            //grab all the matches (doesnt reuse characters)
            const matches = dataIn[i][j].match(/(^|[^A-Za-z])[A-Za-z]{1,4}\s?\d{4}/);

            if(matches){
              matches.forEach((course) => {
                const curID = correctCourseID(course.trim());

                if(curID !== null){                             
                  output.push({ "Course" : curID, 'sheetName' : sheetName, "columnID" : j/2}); 
                }
              });
            }
          }
        }
      }
    }
    return output;
  }

  const parsePrereq = (dataIn) => {
    let output = [];

    for(let i = 1, iSize = dataIn.length; i < iSize; i++){
      for(let j = 1, jSize = dataIn[i].length; j < jSize; j++){
        if(dataIn[i][j] !== undefined){
          if(typeof dataIn[i][j] === "string"){
            //grab all the matches (doesnt reuse characters)
            const matches = dataIn[i][j].match(/(^|[^A-Za-z])[A-Za-z]{1,4}\s?\d{4}/);

            if(matches){
              matches.forEach((course) => {
                const curID = correctCourseID(course.trim());

                if(curID !== null){                             
                  output.push({ "Course" : curID, 'PrereqFor' : correctCourseID(dataIn[i][0]), 'isCoreq' : dataIn[i][j].endsWith("*") ? 1 : 0}); 
                }
              });
            }
          }
        }
      }
    }
    return output;
  }

  const parseVaildTags = (dataIn) => {
    let output = [];

    for(let i = 1, iSize = dataIn.length, j, jSize; i < iSize; i++){
      for(j = 0, jSize = dataIn[i].length; j < jSize; j++){
        if(dataIn[i][j] !== undefined){
          if(typeof dataIn[i][j] === "string"){
            //grab all the matches (doesnt reuse characters)
            const course = dataIn[i][j].search(/\d/);

            if(course !== -1){                      
              output.push({ "Course" : correctCourseID(dataIn[i][j]), 'Type' : dataIn[0][j], 'isSubject' : 0, 'isException' : 0});
            }
            else{                      
              output.push({ "Course" : dataIn[i][j], 'Type' : dataIn[0][j], 'isSubject' : 1, 'isException' : 0});
            }
          }
        }
      }
    }
    return output;
  }

  const parseExceptions = (dataIn) => {
    let output = [];

    for(let i = 1, iSize = dataIn.length, j, jSize; i < iSize; i++){
      for(j = 0, jSize = dataIn[i].length; j < jSize; j++){
        if(dataIn[i][j] !== undefined){
          if(typeof dataIn[i][j] === "string"){                   
            output.push({ "Course" : correctCourseID(dataIn[i][j]), 'Type' : dataIn[0][j], 'isSubject' : 0, 'isException' : 1});
          }
        }
      }
    }
    return output;
  }

  const parseReplacements = (dataIn) => {
    let output = [];

    for(let i = 1, iSize = dataIn.length, j, jSize; i < iSize; i++){
      for(j = 1, jSize = dataIn[i].length; j < jSize; j+=2){
        if(dataIn[i][j] !== undefined){
          if(typeof dataIn[i][j] === "string"){       
            const matches = [...dataIn[i][j].matchAll(/(^|[^A-Za-z])[A-Za-z]{1,4}\s?\d{4}/g)];
            if(matches){
              matches.forEach((arr) => {
                const curID = correctCourseID(arr[0].trim());

                if(curID !== null){                             
                  output.push({ "Course" : correctCourseID(dataIn[i][j-1]), 'Replaces' : curID});
                }
              });
            }          
            
          }
        }
      }
    }
    return output;
  }

  const parseGroups = (dataIn) => {
    let output = [];

    for(let i = 1, iSize = dataIn.length, j, jSize; i < iSize; i++){
      for(j = 0, jSize = dataIn[i].length; j < jSize; j++){
        if(dataIn[i][j] !== undefined){
          if(typeof dataIn[i][j] === "string"){

            const course = dataIn[i][j].search(/\d/);

            if(course !== -1){                      
              output.push({ "Course" : correctCourseID(dataIn[i][j]), 'Group' : dataIn[0][j], 'isSubject' : 0});
            }
            else{                      
              output.push({ "Course" : dataIn[i][j], 'Group' : dataIn[0][j], 'isSubject' : 1});
            }
          }
        }
      }
    }
    return output;
  }

  // Formats Corse ID to Database Format
  const correctCourseID = (crsID) => {
    let numStartIndex = crsID.search(/\d/);

    if(numStartIndex === -1){
        return null;
    }

    // Cover the edge case where the engg courses arent titled correctly
    if(crsID.startsWith("ENG") && crsID[3] !== 'G' && crsID[3] !== 'L'){
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

  useEffect(() => {
    if (file) {
      const upload = async () => {
        await handleFile(file);
        setFile(null);
      };
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
          fullWidth="true" 
        > 
          Upload XLSX File
        </Button>
      </label>
    </Box>
  );
};

export default XLSXUpload;