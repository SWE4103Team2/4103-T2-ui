import React, { useState, useEffect } from 'react'
import { TextField, Button, Paper, Grid, Select, MenuItem } from '@mui/material';
import { DropZone } from '../components';

export const FileUpload = () => {
    const [dataSetName, setDataSetName] = useState(null);
    const [programName, setProgramName] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const programs = [ 'SWE', 'EE', 'CHE', 'GGE', 'ME', 'CE', 'MULTI' ]

	// Upon upload, reset state.
    useEffect(() => {
        if (uploaded) {
			setUploaded(false);
		}
    }, [uploaded]);

    return (
        <Paper sx={{ minWidth: '30%', maxWidth: '30%', minHeight: '500px' }}>
            <Grid container xs={12} direction="column" justifyContent="center" alignItems="center">
				{/** Input Boxes **/}
                <Grid item sx={{ paddingTop: 5 }}>
                    <TextField
                        size="small"
                        label="Dataset Name"
                        id="dataset-name"
                        onChange={e => setDataSetName(e.target.value)}
                        sx={{ mr: '0.5rem', mt: 2 }} />
                    <Select
                        size="small"
                        value={programName}
                        label="Program"
                        id="dropdown-program"
                        onChange={e => setProgramName(e.target.value)}
                        sx={{ mr: '0.5rem', mt: 2, width: '6rem' }}
                    >
                        {programs.map((programTitle) => {
                            return <MenuItem id={programTitle} value={programTitle}> {programTitle} </MenuItem>
                        })}
                    </Select>
                </Grid>

				{/** DropZone Component **/}
                <Grid item sx={{ p: 8 }}>
                    <DropZone btnPressed={uploaded} pName={programName} dName={dataSetName} />
                </Grid>

				{/** Submit Button **/}
                <Grid item sx={{ p: 5 }}>
                    <Button
                        variant="contained"
                        size="medium"
                        component="span"
                        id="submit-set"
                        disabled={dataSetName && programName ? false : true}
                        onClick={() => setUploaded(true)}
                        sx={{ height: '100%' }}
                    > 
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}