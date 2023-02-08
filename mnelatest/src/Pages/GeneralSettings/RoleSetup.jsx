import { Label } from '@mui/icons-material'
import "../../Assets/styles/styles.css"
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, Input, InputLabel, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetPermissionsAction from '../../Redux/Actions/UserManagement/GetPermissions'
import { Box } from '@mui/system'
import CreateRoleAction from '../../Redux/Actions/UserManagement/setUpRole'

function RoleSetup({ Permissionss,Permissions,RoleName,roleId }) {
  console.log("Permissionss",Permissionss)
  const [permissions, setPermissions] = useState([])
  const [name, setName] = useState("")
  const dispatch = useDispatch()
  const [perm,setPerm]=useState(false)
  const userPermissions = useSelector(state => state.permissions.data)
 
  const handleChange = (event, permission) => {
    !Permissions.includes(permission.name) && setPermissions(oldarray => [...Permissions, permission.name])
    // Permissions.includes(permission) && setPermissions(oldarray => [...oldarray, permission.name])
    
   
  };


  
  const handleSubmit = () => {
    const data = {
      role_id: roleId,
      permissions: permissions
    }
    
    dispatch(CreateRoleAction(data))
  }
  const handleDefaultChecked=(id)=>{
   
      return Permissions.includes(id)
      
    }
    
  useEffect(() => {
    dispatch(GetPermissionsAction())
   
  }, [Permissions])

  return (
    <div>
      <form>
        <Grid container spacing={2} sx={{ m: 3 }} style={{ margin: "10px" }}>
          <Grid item xs={12} sm={11} style={{ padding: "10px" }} >
            <Typography class="sub-sub-t ">Role Name</Typography>
            {/* <InputLabel htmlFor="my-input">Role Name</InputLabel> */}
            <TextField id="my-input" class="center" aria-describedby="my-helper-text" fullWidth value={RoleName} onChange={(e) => setName(e.target.value)} />
            {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}

          </Grid>
        </Grid>

        <Typography class="sub-sub-t m-3">Assign Permissions</Typography>
        <Grid container spacing={2} sx={{ m: 3 }} style={{ margin: "10px" }}>
          {userPermissions.length > 0 && userPermissions.map((permission, index) => {
         
          return(
            
            <Grid item xs={12} sm={6} md={6}  >
              <FormControlLabel control={<Checkbox defaultChecked={handleDefaultChecked(permission.id
                )} />} class="text-capitalize" label={permission.name.replace("-"," ")} onChange={(e) => handleChange(e, permission)} />
            </Grid>
          )})}



        </Grid>
        <Box class="right-side">
          <Button variant="contained" class=" btn btn-primary btn-light-color" onClick={() => handleSubmit()}>Submit</Button>
        </Box>



      </form>
    </div>
  )
}

export default RoleSetup