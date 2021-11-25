import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

const MenuDropDown = ({menuButtonsIn}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick} variant="contained" sx={{ width: '15rem'}}>Extras Menu</Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        sx={{ width: '300'}}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
      >
        {menuButtonsIn}
      </Menu>
    </div>
  );
}

export default MenuDropDown;