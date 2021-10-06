import React from 'react';
import { Link } from "react-router-dom";
import { Drawer } from './SidebarDrawer.js';
import { Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LeftIcon from '@mui/icons-material/ChevronLeft';
import StudentIcon from '@mui/icons-material/PersonSearch';

const Item = ({ open, title, icon, link }) => {
  return (
    <>
      <ListItem button component={Link} to='/' sx={{ pl: "25px" }}>
        {open ? (
          <ListItemIcon>
            {icon}
          </ListItemIcon>
        ) : (
          <Tooltip title="Students" placement="right" arrow>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
          </Tooltip>
        )}
        <ListItemText>
          {title}
        </ListItemText>
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};


const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <Drawer variant="permanent" open={open}>
        <Button onClick={toggleDrawer} sx={{ w:"100%", height:"4rem" }}>
          {open ? <LeftIcon /> : <MenuIcon />}
        </Button>
        <Divider />
        <List>
          <Item open={open} title="Students" icon={<StudentIcon color="secondary" />} />
          <Item open={open} title="Page 2" icon={<StudentIcon color="secondary" />} />
          <Item open={open} title="Page 3" icon={<StudentIcon color="secondary" />} />
          <Item open={open} title="Page 4" icon={<StudentIcon color="secondary" />} />
        </List>
      </Drawer>
    </Box>  
   
  );
}
export default Sidebar;