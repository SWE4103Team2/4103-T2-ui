import React, { useState, useEffect } from 'react';
import { Box, TextField, Input, Button, Modal, Grid, Typography} from '@mui/material';

const DeleteButton = ({ apiFunction, fileIDIn, setUpdate, updateState}) => {

	const [modalState, setModalState] = useState(false);

	// useEffect(() => {
	// 	const upload = async () => {
	// 	  const data = await apiFunction(fileName, file);
	// 	  console.log(data);
	// 	  setFile(null);
	// 	};
	
	// 	if (fileName && file) {
	// 	  upload();
	// 	}
	//   }, [file]);

	useEffect(() => {
		if(modalState){
			
		}
	}, [modalState]);

	const deleteFiles = async () => {
		const deleteF = async () => {
			await apiFunction(fileIDIn);
		}
		deleteF();
		setModalState(false);
		setUpdate(!updateState);
	}

  return (
    <Box display='flex'>
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
							<Typography variant={"h5"}>Are you sure you want to delete all files associated with "{fileIDIn}"</Typography>
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
            <Button variant="contained" component="span" sx={{marginLeft:3}} onClick={e => {setModalState(true)}}> 
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