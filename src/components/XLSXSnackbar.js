import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const XLSXSnackbar = ({info}) => {
    const [open, setOpen] = React.useState(false);
    const [string, setString] = React.useState([0, 0]);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        setOpen(info[0]);
        setString(info[1]);
        setError(info[2]);
    }, [info]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
            {string}
        </Alert>
    </Snackbar>
    );
}

export default XLSXSnackbar;