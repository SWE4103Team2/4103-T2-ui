import React, { useState, useEffect } from 'react'
import { TextField, Button, Paper, Grid, Select, MenuItem } from '@mui/material';
import { DropZone } from '../components/DropZone';

export const FileUpload = () => {

    const [dataSetName, setDataSetName] = useState(null);
    const [programName, setProgramName] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const programs = [
        'SWE',
        'EE',
        'CHE',
        'GGE',
        'ME',
        'CE',
        'MULTI'
    ]

    useEffect(() => {
        if(uploaded) setUploaded(false)
    }, [uploaded])

    return (
        <Paper sx={{minWidth: '30%', maxWidth: '30%', minHeight: '500px'}} >
            <Grid container xs={12} direction="column" justifyContent="center" alignItems="center">
                <Grid item sx={{ paddingTop: 5 }}>
                    <TextField
                        size="small"
                        label="DateSet Name"
                        onChange={(e) => setDataSetName(e.target.value)}
                        sx={{ mr: '0.5rem', marginTop: 2}} />
                    <Select
                        size="small"
                        value={programName}
                        label="Program"
                        onChange={(e) => setProgramName(e.target.value)}
                        sx={{ mr: '0.5rem', marginTop: 2, width: '6rem'}} >
                        {programs.map((programTitle) => {
                            return <MenuItem value={programTitle}>{programTitle}</MenuItem>
                        })}
                    </Select>
                </Grid>
                <Grid item sx={{ padding: 8 }}>
                    <DropZone btnPressed={uploaded} pName={programName} dName={dataSetName} />
                </Grid>
                <Grid item sx={{ padding:5 }}>
                    <Button
                        variant="contained"
                        size="medium"
                        component="span"
                        disabled={dataSetName && programName ? false : true}
                        onClick={(e) => setUploaded(true)}
                        sx={{ height: '100%'}}
                    > 
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}