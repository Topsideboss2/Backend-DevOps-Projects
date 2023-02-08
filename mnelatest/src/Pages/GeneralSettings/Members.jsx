// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { useEffect, useState } from 'react'
import "../../Assets/styles/styles.css"
import { useDispatch, useSelector } from 'react-redux'
import { LocalStorage } from '../../Utils/Hooks/useLocalStorage'
import GetCompanyUserAction from '../../Redux/Actions/Users/GetUsersAction'
import moment from 'moment'
import GetSingleRoleAction from '../../Redux/Actions/UserManagement/GetSingleRole'
import { Button, Pagination } from '@mui/material'
import { Add } from '@mui/icons-material'
import WithToggle from '../../Utils/Hoc/ToggleHoc'
import AddMembers from '../../Components/modals/AddMembers'
import usePagination from '../../Utils/Hooks/usePagination'
import GetRoleAction from '../../Redux/Actions/UserManagement/GetRoles'





const MembersTable = ({isShown, toogle,newMember}) => {
    const [members,setMembers]=useState([])
    const [addedMembers, setAddedMembers] = useState([])
    const token=LocalStorage("token")
    const [roleId,setRoleId]=useState()
    const [roles, setRoles] = useState("")
  const dispatch=useDispatch()
  const companyMembers=useSelector(state=>state.companyUsers.data)
  const userRoles = useSelector(state => state.userRoles.data)

  const [page, setPage] =useState(2);
  const [rowsPerPage, setRowsPerPage] =useState(10);
// pagination

const count = Math.ceil(
  addedMembers.length === 0 ? companyMembers.length / rowsPerPage : addedMembers.length / rowsPerPage
  );
const _DATA = usePagination(addedMembers.length === 0 ? companyMembers : addedMembers, rowsPerPage);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
  _DATA.jump(newPage)
};
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

    const getFieldData=async()=>{
       dispatch(GetCompanyUserAction())
    }
 
    const handleUpdate=(childData)=>{
        setMembers(oldArray=>[...oldArray,childData])
    }
   
    useEffect(() => {
      dispatch(GetCompanyUserAction())
      dispatch(GetRoleAction())
      userRoles?.map((membermap) => {
          setRoles(oldarray => [...oldarray, { value: membermap.id, label: membermap.name }])

      })
      setAddedMembers([...companyMembers,newMember])

       
                
    }, [roleId,newMember])
  return (
    <Card>
      <Box class="right-side m-4">
        <AddMembers roles={userRoles}/>
        {/* <Button variant="outlined" startIcon={<Add/>} style={{color:"#00a15d"}} size="large" onClick={toogle}>Add Member</Button> */}
      </Box>
     
      
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead style={{backgroundColor:"RGBA(0,161,93,0.27)"}}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyMembers.map((row ,index)=> (
              <TableRow hover key={row.name} 
              // sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
              style ={ index % 2? { background : "#fdfdfd" }:{ background : "white" }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.user_name}</Typography>
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.user_email}</TableCell>
                <TableCell>{moment(row.created_at).format('MMMM DD YYYY')}</TableCell>
               
                <TableCell>
                  <Chip
                    label={row.active===1?"Active":"suspended"}
                    color={row.active===1?"success":"error"}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
      />
    </Card>
  )
}

export default WithToggle(MembersTable);
