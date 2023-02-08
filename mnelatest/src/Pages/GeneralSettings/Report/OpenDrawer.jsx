import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Add } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import AddReport from './ReportAdd';


export default function AddReportMain({newDynamicField}) {
  const [state, setState] = React.useState({
    
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450 }}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
        
      <Box style={{dispay:"flex !important",flexDirection:"row",height:"100px",padding:"40px"}}>
        
        <CloseIcon onClick={toggleDrawer(anchor, false)} style={{fontSize:"52px" ,marginY:"auto"}}
      onKeyDown={toggleDrawer(anchor, false)}/>

      </Box>
      <Divider />
      <AddReport toggle={toggleDrawer(anchor, false)} newDynamicField={newDynamicField}/>
    </Box>
  );

  return (
    <div>
     
        <React.Fragment >
          <Button variant="outlined" startIcon={<Add />} style={{ color: "#00a15d" }} size="large" onClick={toggleDrawer("right", true)}>Add Report</Button>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
    
    </div>
  );
}
