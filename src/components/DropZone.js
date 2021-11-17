import React, { useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import { FormHelperText, Alert, Collapse, IconButton, Grid, Typography } from '@mui/material';
import { uploadFilesAPI } from '../api/upload'
import CloseIcon from '@mui/icons-material/Close';
import { studentFileHeaders, courseFileHeaders, tranferFileHeaders } from '../config/requiredHeadersForFiles'

const DropZone = ({btnPressed, pName, dName}) => {
    const [fileName, setFileName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorColor, setErrorColor] = useState("");
    const [errorAlert, setErrorAlert] = useState(false);
    const [files] = useState([]);
    const [fileValidation, setFileValidation] = useState(true);
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ maxFiles: 3 });

    /*
        API call and check for validation if true and the 'submit' button has been pressed.
        DIsplays alert according to the response of the API.
    */
    useEffect(() => {
        if(fileValidation && btnPressed) {
            const upload = async () => {
                await uploadFilesAPI(dName, pName, files).then((success) => {
                    setErrorColor("success");
                    setErrorMessage("Successfully uploaded the file(s).");
                }).catch((error) => {
                    setErrorColor("error");
                    if(error.response === undefined){
                        console.log(error);
                        setErrorMessage("Unknown Error");
                    }else if(error.response.data === 'StudentFileException'){
                        setErrorMessage("Student File Error");
                    }
                    else if(error.response.data === 'CourseFileException'){
                        setErrorMessage("Course File Error");
                    }
                    else if(error.response.data === 'TransferFileException'){
                        setErrorMessage("Transfer File Error");
                    }
                    else if(error.response.data === 'NullFileException'){
                        setErrorMessage("Missing File(s)");
                    }
                    else if(error.response.data === 'FileNameExistsException'){
                        setErrorMessage("File Name Already Exists");
                    }
                    else if(error.response.data === 'MissingParameters'){
                        setErrorMessage("Missing Parameters");
                    }
                    else{
                        setErrorMessage("Unknown Error");
                    }
                });
                setErrorAlert(true)
            };
            upload();
        }
        else if(!fileValidation){
            setErrorColor("error");
            setErrorMessage("Invalid File(s)");
            setErrorAlert(true)
        }
        // eslint-disable-next-line
    }, [btnPressed]);

    /*
        Validation for the files uploaded and small print message with the uploaded files.
    */
    useEffect(() => {
        if(acceptedFiles.length !== 0) { // Process for checking the files that are being uploaded. The validation process. Needs a look over.
            while(files.length > 0) {
                files.pop();
            }
            setErrorAlert(false);
            setFileValidation(true);
            acceptedFiles.forEach((file) => {
                let fileReader = new FileReader();
                let individualHeadersInFile;

                fileReader.onload = function(e) {

                    let content = fileReader.result;
                    let firstLineOfFile = content.split('\n').shift().replace("\r", "");
                    individualHeadersInFile = firstLineOfFile.split("\t");

                    if(studentFileHeaders.every(r => individualHeadersInFile.includes(r))) {
                        files[0] = file;
                    } else if(courseFileHeaders.every(r => individualHeadersInFile.includes(r))) {
                        files[1] = file;
                    } else if(tranferFileHeaders.every(r => individualHeadersInFile.includes(r))) {
                        files[2] = file;
                    } else {
                        setFileValidation(false);
                        setErrorColor("error");
                        setErrorMessage("Invalid File(s)");
                        setErrorAlert(true)
                    }
                }
                fileReader.readAsText(file);
            });

            // Listing the files that have been put into the dropzone. Can be either good or bad files.
            const filesStrings = acceptedFiles.map((fileObject) => {
                    return <div>{fileObject.path}</div>;
            });
            setFileName(filesStrings);
        }
        // eslint-disable-next-line
    }, [acceptedFiles]);

    return (
        <Grid container rowSpacing={3}>
            <Grid item align='center' sx={{ padding:3 }}>
                <div {...getRootProps({ className: 'dropzone' })} style={{
                    color: "#bdbdbd",
                    backgroundColor: "#fafafa",
                    flex: "1",
                    flexDirection: 'column',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    outline: "none",
                    transition: "border .24s ease-in-out",
                    borderRadius: "10px",
                    borderWidth: "2px",
                    borderColor: "#eeeeee",
                    borderStyle: "dashed",
                    height: "100px",
                    padding: "20px",
                }}>
                    <input
                    sx={{ display: 'none' }}
                    value=""
                    accept="text/html"
                    type="file"
                    {...getInputProps()}
                />
                <Typography>
                    Drag and Drop Files
                    <br />
                    OR
                    <br />
                    Click to Select Files
                </Typography>
                </div>
                <FormHelperText>{fileName}</FormHelperText>
            </Grid>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Collapse in={errorAlert}>
                    <Alert
                        severity={errorColor}
                        color={errorColor}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErrorAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >
                        {errorMessage}
                    </Alert>
                </Collapse>
            </Grid>
        </Grid>
    )
};

export default DropZone;