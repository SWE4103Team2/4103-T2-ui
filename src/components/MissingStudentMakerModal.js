import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Modal, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { addSingleStudent } from '../api/students';

/**
 * MissingStudentMakerModal
 */
const MissingStudentMakerModal = ({rowData, programIn, refreshStudents, closeTranscript}) => {

    const [modalState, setModalState] = useState(false);
    const [data, setData] = useState({});
    const [program, setProgram] = useState("MULTI");
    const [errors, setErrors] = useState([false,false,false,false,false,false]);
    const [values, setValues] = useState(['','','','','','']);

    useEffect(() => {
        if(rowData)
            setData(rowData);
            values[0] = rowData.Student_ID;
    }, [rowData]);

    useEffect(() => {
        if(programIn && programIn !== "MULTI")
            setProgram("BS" + programIn);
            values[4] = "BS" + programIn;
    }, [programIn]);

    const handleSave = () => {
        if(!values.some((value) => {return value === ""})){
            const upload = async () => {
                var stu = {};
                stu.fileID = rowData.fileID;
                stu.Student_ID = values[0];
                stu.Name = values[1];
                stu.Start_Date = values[2];
                stu.Email = values[3];
                stu.Program = values[4];
                stu.Campus = values[5];
                console.log(await addSingleStudent(stu));
            };
            upload();
            handleClose();
            // closeTranscript();
            // refreshStudents();
        }
        else{
            setErrors(values.map((value) => {return value === ""}));
        }
    };

    const handleChange = (value, id) => {
        values[id] = value;
    };
    
    const handleClose = () => {
        if(modalState)
            setErrors([false,false,false,false,false,false]);
            setModalState(false);
    };

    const handleOpen = () => {
        if(!modalState)
            setModalState(true);
    };

  // 
  return (
    <div>
        <Modal
            open={modalState}
            onBackdropClick={handleClose}
        >
            <Box sx={modalStyle}>
                <Grid container style={{textAlign:'center'}}>
                    <Grid item xs>
                        <TextField 
                            label="Student ID" 
                            defaultValue={data.Student_ID}
                            disabled
                            sx={{margin:1, width: '10rem'}}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField 
                            label="Full Name" 
                            defaultValue={""}
                            placeholder={"First Last"}
                            onChange={(e) => {}}
                            error={errors[1]}
                            onChange={(e) => handleChange(e.target.value, 1)}
                            sx={{margin:1, width: '10rem'}}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField 
                            label="Start Date" 
                            defaultValue={""}
                            placeholder={"YYYY-MM-DD"}
                            onChange={(e) => {}}
                            error={errors[2]}
                            onChange={(e) => handleChange(e.target.value, 2)}
                            sx={{margin:1, width: '10rem'}}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField 
                            label="Email Tag" 
                            defaultValue={""}
                            placeholder={"Without @unb.ca"}
                            onChange={(e) => {}}
                            error={errors[3]}
                            onChange={(e) => handleChange(e.target.value, 3)}
                            sx={{margin:1, width: '10rem'}}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField 
                            label="Program" 
                            defaultValue={programIn === "MULTI" ? "" : program}
                            placeholder={"ie. BSSWE"}
                            disabled={programIn !== "MULTI"}
                            onChange={(e) => {}}
                            error={errors[4]}
                            onChange={(e) => handleChange(e.target.value, 4)}
                            sx={{margin:1, width: '10rem'}}
                        />
                    </Grid>
                    <Grid item xs>
                        <FormControl error={errors[5]} sx={{margin:1}}>
                            <InputLabel>
                                Campus
                            </InputLabel>  
                            <Select
                                label="Campus"
                                placeholder={"FR or SJ"}
                                onChange={(e) => {}}  
                                
                                defaultValue={""}
                                onChange={(e) => handleChange(e.target.value, 5)}
                                sx={{ width: '10rem'}}
                            >
                            <MenuItem value={"FR"}>FR</MenuItem>
                            <MenuItem value={"SJ"}>SJ</MenuItem>
                            </Select>
                        </FormControl> 
                    </Grid>
                </Grid>  
                <Grid container>
                    <Grid item xs={12} style={{textAlign:'center'}}>
                        <Button variant="contained" component="span" 
                        sx={{margin:1, width: '10rem'}} onClick={handleClose}> 
                            Cancel
                        </Button>
                        <Button variant="contained" component="span" 
                        sx={{margin:1, width: '10rem'}} onClick={handleSave}> 
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
        <Button onClick={handleOpen} variant="contained" component="span" >Set Student</Button>
    </div>
  );
}

//The style for the modal
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default MissingStudentMakerModal;