import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AssignmentIcon from '@mui/icons-material/Assignment';
import GetMilestonesTasksAction from '../../../Redux/Actions/Milestones/GetMilestoneTasks';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Activities({mid}) {
const dispatch=useDispatch()
const milestoneTasks=useSelector(state=>state.milestoneTasks.data)
const loading=useSelector(state=>state.milestoneTasks.loading)

console.log("milestoneTasks",milestoneTasks)
React.useEffect(() => {
 dispatch(GetMilestonesTasksAction(mid))
}, [])


  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            High Priority Tasks
          </Typography>
          <Demo>

            <List >
             {milestoneTasks.filter(function(task) {
                        return task.priority =="high" }).slice(0,3).map((task,index)=>(
                            <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                               {task.status=="incomplete"?( <AssignmentIcon sx={{color:"#FFCCCC"}}/>):( <CheckCircleIcon sx={{color:"#00a15d" }}/>)
}                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={task.title}
                              secondary={task.status}
                            />
                          </ListItem>
                        ))
}
              
           
            </List>
          </Demo>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Upcoming Deadlines
          </Typography>
          <Demo>
            <List >
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                  <FormControlLabel control={<Checkbox defaultChecked />}  />

                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    // secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}