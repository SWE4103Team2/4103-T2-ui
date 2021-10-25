import React, { useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import { FormHelperText } from '@mui/material';
import { uploadFilesAPI } from '../api/upload'
import { studentFileHeaders, courseFileHeaders, tranferFileHeaders } from '../config/requiredHeadersForFiles'

export const DropZone = ({btnPressed, pName, dName}) => {
    const [fileName, setFileName] = useState("");
    const [files, setFiles] = useState([]);
    const [fileValidation, setFileValidation] = useState(false);
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone();

    useEffect(() => {
        if(fileValidation && btnPressed) {
            const upload = async () => {
                await uploadFilesAPI(dName, pName, files);
                alert("Files Uploaded");
            };

            upload();
        }
    }, [btnPressed]);

    useEffect(() => {
        if(acceptedFiles.length !== 0) { // Process for checking the files that are being uploaded. The validation process. Needs a look over.
            acceptedFiles.map((file) => {
                let fileReader = new FileReader();
                let individualHeadersInFile;

                fileReader.onload = function(e) {
                    setFileValidation(false);

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

    return (
        <>
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
        </>
    )
}