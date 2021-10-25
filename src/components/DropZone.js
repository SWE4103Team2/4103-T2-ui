import React, { useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import { FormHelperText, Alert, Collapse, IconButton, Grid } from '@mui/material';
import { uploadFilesAPI } from '../api/upload'
import CloseIcon from '@mui/icons-material/Close';
import { studentFileHeaders, courseFileHeaders, tranferFileHeaders } from '../config/requiredHeadersForFiles'

export const DropZone = ({btnPressed, pName, dName}) => {
    const [fileName, setFileName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorColor, setErrorColor] = useState("");
    const [errorAlert, setErrorAlert] = useState(false);
    const [files, setFiles] = useState([]);
    const [fileValidation, setFileValidation] = useState(false);
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
        maxFiles:3
    });

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
                    setErrorMessage("Failed to upload file(s).");
                });
                setErrorAlert(true)
            };
            upload();
        }
    }, [btnPressed]);

    /*
        Validation for the files uploaded and small print message with the uploaded files.
    */
    useEffect(() => {
        if(acceptedFiles.length !== 0) { // Process for checking the files that are being uploaded. The validation process. Needs a look over.
            acceptedFiles.map((file) => {
                let fileReader = new FileReader();
                let individualHeadersInFile;

                fileReader.onload = function(e) {

                    let content = fileReader.result;
                    let firstLineOfFile = content.split('\n').shift().replace("\r", "");
                    individualHeadersInFile = firstLineOfFile.split("\t");

                    if(studentFileHeaders.every(r => individualHeadersInFile.includes(r))) {
                        setFileValidation(true);
                    } else if(courseFileHeaders.every(r => individualHeadersInFile.includes(r))) {
                        setFileValidation(true);
                    } else if(tranferFileHeaders.every(r => individualHeadersInFile.includes(r))) {
                        setFileValidation(true);
                    } else {
                        setFileValidation(false);
                        alert("Error uploading file(s).");
                    }
                }
                fileReader.readAsText(file);
            });

            // Listing the files that have been put into the dropzone. Can be either good or bad files.
            const filesStrings = acceptedFiles.map((fileObject) => {
                if(acceptedFiles.length === 1 || fileObject.path === acceptedFiles[acceptedFiles.length-1].path) {
                    return fileObject.path;
                } else {
                    return fileObject.path + ", ";
                }
            
            });
            [files[0], files[1]] = [files[1], files[0]]
            setFileName(filesStrings);
            setFiles(acceptedFiles);

        };
    }, [acceptedFiles]);

    /*
        3 second timer for error display.
    */
    useEffect(() => {
        const timeId = setTimeout(() => { // After 3 seconds set the errorAlert value to false
          setErrorAlert(false)
        }, 3000);
        return () => {
            clearTimeout(timeId)
          }
    }, [errorAlert]);

    return (
        <Grid container rowSpacing={3}>
            <Grid item sx={{ padding:3 }}>
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
                <p>Drag 'n' drop files here, or click to select files</p>
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
}