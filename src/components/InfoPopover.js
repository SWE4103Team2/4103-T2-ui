import React from 'react';
import { Tooltip } from '@mui/material';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';


const InfoPopover = ({ info, direction }) => {
  return (
    <Tooltip title={info} placement={direction}>
      <HelpOutlineRoundedIcon fontSize='small' sx={{ pr: '0.5rem'}} />
    </Tooltip>
  );
}

InfoPopover.defaultProps = {
  direction: 'left'
}

export default InfoPopover
