import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';


const InfoPopover = ({info}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
        <Popover
            sx={{
            pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <Typography sx={{ p: 1, maxWidth: 300 }}>{info}</Typography>
        </Popover>
        <HelpOutlineRoundedIcon sx={{ pr: '0.5rem'}}onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} />
    </Box>
  );
}

export default InfoPopover
