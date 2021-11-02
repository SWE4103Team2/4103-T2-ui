import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, Grid, Typography} from '@mui/material';

/**
 * Used to add a delete button to a page, it must be passed the file ID of the files you want to delete
 * Parameters:
 * 		apiFunction - The delete API function, needs to be passed in so this can work on any page (probably doesnt NEED to, but idk how to do it)
 * 		fileIDIn - The file ID you wish to delete, needs to be passed in because i original set this up for the student page and its alread selectable there and displayed there
 * 		setUpdate - not required, used to update the page that this button is on
 * 		updateState - boolean, not required, used the the updated state is different from the previous state
 */
const DeleteButton = ({ apiFunction, fileIDIn, setUpdate, updateState}) => {

	const [modalState, setModalState] = useState(false);

	/**
	 * TODO (not a requirement, but would be nice)
	 * Calls the API to get the row counts related to this file id
	 */
	useEffect(() => {
		if(modalState){
			
		}
	}, [modalState]);

	/**
	 * Function to call the API to delete the files, then closes the modal and updates the state of the page
	 */
	const deleteFiles = async () => {
		const deleteF = async () => {
			await apiFunction(fileIDIn);
		}
		deleteF();
		setModalState(false);
		if(setUpdate){
			setUpdate(!updateState);
		}
	}

  return (
    <Box display='flex' width="100%" >
      	<Modal
        open={modalState}
        onBackdropClick={e => setModalState(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      	>
			<Box sx={style}>
				<Grid container flex style={{height:'20vh'}}>
					<Grid container>
						<Grid item xs={12} style={{textAlign:'center'}}>
							<Typography variant={"h5"}>Are you sure you want to delete all files associated with the file ID "{fileIDIn}"</Typography>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={6} style={{textAlign:'center'}}>
							<Button variant="contained" component="span" sx={{marginLeft:3}} onClick={e => {setModalState(false)}}> 
								Decline
							</Button>
						</Grid>
						<Grid item xs={6} style={{textAlign:'center'}}>
							<Button variant="contained" component="span" sx={{marginLeft:3}} onClick={e => {deleteFiles(fileIDIn)}}> 
								Confirm
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Modal>
            <Button 
				variant="contained" 
				component="span" 
				fullWidth="true" 
				onClick={e => {setModalState(true)}}
			> 
                Delete Files
            </Button>
    </Box>
  );
};

export default DeleteButton

//The style for the modal
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '30%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };