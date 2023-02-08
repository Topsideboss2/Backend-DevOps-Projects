import { Button, Card, CardActions, CardContent, Grid, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { element } from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
// import "../../../Assets/styles/styles.css"
import MemberAvatar from '../../../Utils/Components/AvatarGroupp'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewPermissions from './ViewPermissions'
import { useDispatch, useSelector } from 'react-redux'
import GetRoleAction from '../../../Redux/Actions/UserManagement/GetRoles'
import { AddBoxTwoTone, Delete } from '@mui/icons-material'
import SyncRole from './SyncRole'
import AddRoles from './AddRoles'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: "#ffffff",
    border: '2px solid #000',
    boxShadow: 24,
    padding: " 1.25rem",
};
export default function ViewRoles() {
    const [open, setOpen] = React.useState(false);
    const [adding,setAdding]=useState(false)
    const [addedArr,setAddedArr]=useState({})
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const Roles = useSelector(state => state.userRoles.data)
    console.log("roles", Roles)
    const members = [
        { user_name: "winfred kagendo" },
        { user_name: "christine kendi" },
        { user_name: "brian Gichuhi" },
        { user_name: "Tabitha Nyamweya" }
    ]

    const handleAdded = useCallback((childData) => {
        console.log("added",childData)
        setAdding(true)
        
      
        setTimeout(() => {
            setAddedArr(childData)
          setAdding(true)
        }, 1000);
      }, [addedArr, adding])
    useEffect(() => {
        dispatch(GetRoleAction(addedArr, adding))
    }, [addedArr, adding])



    return (
        <Box>
            <div style={{ color: "#00a15d", float: 'right' }}>
                <Button variant="outlined" onClick={handleOpen} handleAdd={handleAdded}>Add Role</Button>
            </div>
            <Box >

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box style={style}>
                        <AddRoles handleClose={handleClose} />
                    </Box>
                </Modal>
            </Box>
            <Grid container spacing={2}>


                {Roles.map((role, index) => (
                
                    <Grid item xs={12} sm={6} md={4}>
                        <Box class="border">
                            <Card class="p-4">
                                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant='h6' class="m-1 text-muted">Total {members.length} Users</Typography>
                                    < MemberAvatar members={members} />

                                </Box>
                                <CardContent>
                                    <Typography variant="h4 text-capitalize">{role.name}</Typography>
                                </CardContent>
                                <CardActions style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                                   {console.log("role permissions",role.permissions)}
                                    <SyncRole Permissions={role.permissions} RoleName={role.name} roleId={role.id}/>

                                    <Box style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}>
                                        <Delete color="error" />

                                    </Box>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                ))}


            </Grid>
        </Box>

    )
}

