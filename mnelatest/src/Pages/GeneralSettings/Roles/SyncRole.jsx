import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import RoleSetup from '../RoleSetup';


export default function SyncRole({Permissions,RoleName,roleId}) {
  const [permid,setPermId]=React.useState([])
  const [state, setState] = React.useState({
    
    right: false,
  });
React.useEffect(() => {
  for (const permission of Permissions) {
     
   Permissions.length >0 && setPermId(prev=>[...prev,permission.name])
    
    console.log("permmm",permid)
  }
}, [])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 650 }}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
        
      <Box style={{dispay:"flex !important",flexDirection:"row",height:"100px",padding:"40px"}}>
        
        <CloseIcon onClick={toggleDrawer(anchor, false)} style={{fontSize:"52px" ,marginY:"auto"}}
      onKeyDown={toggleDrawer(anchor, false)}/>

      </Box>
      <Divider />
      <RoleSetup  RoleName={RoleName} toggle={toggleDrawer(anchor, false)} Permissionss={Permissions} Permissions={permid} roleId={roleId}/>
    </Box>
  );

  return (
    <div>
     
        <React.Fragment >
          <Button variant="outlined" startIcon={<Add />} style={{ color: "#00a15d" }} size="large" onClick={toggleDrawer("right", true)}>View Permissions</Button>
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
