import React, { useState, useEffect } from 'react'
import { Box, TextField, Input, Button, Paper, Grid, FormHelperText } from '@mui/material';
import {useDropzone} from 'react-dropzone';
import { borderRadius } from '@mui/system';

export const FileUpload = ({ apiFunction }) => {

    const [file, setFile] = useState([]);
    const [dataSetName, setDataSetName] = useState(null);
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone();

    useEffect(() => {
        const files = acceptedFiles;
        setFile(files);
        console.log(acceptedFiles)
    }, [acceptedFiles]);
    

    return (
        <Paper sx={{minWidth: '30%', minHeight: '500px'}}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs="12">
                    <Box display='flex'>
                        <TextField
                            size="small"
                            placeholder='Dataset Name'
                            onChange={e => setDataSetName(e.target.value)}
                            sx={{ mr: '0.5rem', marginTop: 2}} />
                        {/* <label>
                        <Input
                            sx={{ display: 'none' }}
                            onClick={e => e.target.value = null}
                            onChange={e => setFile(e.target.files[0])}
                            accept="text/plain"
                            type="file"
                        />
                        <Button
                            variant="contained"
                            size="small"
                            component="span"
                            disabled={!dataSetName}
                            sx={{ height: '70%', marginTop: 2 }}
                        > 
                            Upload File
                        </Button>
                        </label> */}
                        
                        <div {...getRootProps({ className: 'dropzone' })} style={{
                            border: "black solid 1px",
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
                         <p>Drag 'n' drop some files here, or click to select files</p>
                         {console.log(file)}
                         <aside>
                            <h4>Files</h4>
                            <ul>
                                <li>{file}</li>
                            </ul>
                        </aside>
                        </div>
                    </Box>
                </Grid>
                {/* <Grid item>
                    {console.log(file)}
                    <FormHelperText>{file.name}</FormHelperText>
                </Grid> */}
                <Grid>
                    
                </Grid>
            </Grid>
        </Paper>
    );
}