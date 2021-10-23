import React, { useState, useEffect } from 'react'
import { Box, TextField, Input, Button, Paper, Grid, FormHelperText } from '@mui/material';
import {useDropzone} from 'react-dropzone';
import DropzoneComponent from 'react-dropzone-component';


export const FileUpload = ({ apiFunction }) => {

    const [fileName, setFileName] = useState([]);
    const [dataSetName, setDataSetName] = useState(null);
    const [programName, setProgramName] = useState(null);
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone();

    useEffect(() => {
        const files = acceptedFiles.map((fileObject) => {
            console.log(fileObject.path);
            <li>{fileObject.path}</li>
        });
        console.log(files);
        setFileName(files);
        console.log(acceptedFiles)
    }, [acceptedFiles]);
    

    return (
        <Paper sx={{minWidth: '35%', maxWidth: '35%', minHeight: '500px'}}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs="12">
                    <Box display='flex'>
                        <TextField
                            size="small"
                            placeholder='Dataset Name'
                            onChange={e => setDataSetName(e.target.value)}
                            sx={{ mr: '0.5rem', marginTop: 2}} />
                        <TextField
                            size="small"
                            placeholder='Program'
                            onChange={e => setProgramName(e.target.value)}
                            sx={{ mr: '0.5rem', marginTop: 2}} />
                
                    </Box>
                </Grid>
                    <Box display='flex'>
                        {/* <Grid item>
                                <DropzoneComponent
                                config={{
                                    iconFiletypes: ['.txt'],
                                    showFiletypeIcon: true,
                                    postUrl: 'no-url'
                                }}
                                eventHandler={{addedfile: (fileItem) => console.log(fileItem)}}
                                djsConfig={{autoProcessQueue: false}}
                            />
                        </Grid> */}
                        <Grid item >
                            <div {...getRootProps({ className: 'dropzone' })} style={{
                                border: "black dotted 2px",
                                borderRadius: "10px",
                                height: "100px",
                                
                            }}>
                                <input
                                sx={{ display: '' }}
                                // onClick={e => e.target.value = null}
                                // onChange={e => setFile(e.target.files[0])}
                                accept="text/plain"
                                type="file"
                                {...getInputProps()}
                            />
                            <p>Drag 'n' drop files here, or click to select files</p>
                            {console.log(fileName)}
                            <aside>
                                <h4>Files</h4>
                                <ul>
                                    <li style={{
                                        marginLeft: 20
                                    }}>{fileName}</li>
                                </ul>
                            </aside>
                            </div>
                        </Grid>
                    </Box>
                    <Grid>
                        <Button
                            variant="contained"
                            size="small"
                            component="span"
                            disabled={!dataSetName && !programName}
                            sx={{ height: '70%'}}
                        > 
                           Submit
                        </Button>
                    </Grid>
            
            </Grid>
        </Paper>
    );
}