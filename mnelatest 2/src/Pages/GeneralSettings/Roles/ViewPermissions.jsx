import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export default function ViewPermissions({ Permissions,Permissionss }) {

    return (
        <List
            sx={{
                width: '350px',
                minWidth: 300,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 500,
                '& ul': { padding: 0 },
            }}
            subheader={<li />}
        >
           
                <Box>
                    <ul>
                        <Typography style={{fontSize:"1.25rem",fontWeight:500}}  class="text-capitalize">My permissions</Typography>
                        {/* <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader> */}
                        {Permissions.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))}
                    </ul>
                </Box>
            
        </List>
    );
}