// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
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
import moment from 'moment'
import { Button, Pagination, Tooltip } from '@mui/material'
import { Add, RemoveRedEyeOutlined } from '@mui/icons-material'
import usePagination from '../../Utils/Hooks/usePagination'
import { Link } from 'react-router-dom'
import GetProjectsAction from '../../Redux/Actions/Projects/GetProjects'
import { red } from '@mui/material/colors'
import DeleteField from '../../Components/modals/Delete'
import DeleteProjectsAction from '../../Redux/Actions/Projects/DeleteProjects'
import { HandlePagination, PagesCount } from '../../Components/pagination/PageCounter'
import Theming from '../../SkeletonLoader/Theming'
import ThemingTable from '../../SkeletonLoader/ThemeTable'



const ProjectsTable = () => {
  const dispatch = useDispatch()
  const companyProjects = useSelector(state => state.projects.data)??[]
  const loading = useSelector(state => state.projects.loading)
  const deleteLoading=useSelector(state => state.deleteProject.loading)
  const [deleting, setDeleting] = useState(false)
  const [deleteId,setDeleteId]=useState()
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // pagination
  const count =PagesCount(companyProjects)
  const paginatedProjects=HandlePagination( companyProjects,rowsPerPage)
  const data=usePagination( companyProjects , rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    data.jump(newPage)
  };

  const handleDelete=(id)=>{
    setDeleting(true)
    setDeleteId(id)
    dispatch(DeleteProjectsAction(id))
  }
  useEffect(() => {
    dispatch(GetProjectsAction(deleteId,deleting))
  
   

  }, [deleteId])
  return (
    <Card>
      <Box class="right-side m-4">

        <Link to="/add-projects">
          <Button variant="outlined" startIcon={<Add />} style={{ color: "#00a15d" }} size="large" >Add Project</Button>
        </Link>
      </Box>


      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead style={{ backgroundColor: "RGBA(0,161,93,0.27)" }}>
            <TableRow>
            <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>actions</TableCell>
            </TableRow>
          </TableHead>
          {console.log("paginated Projects",paginatedProjects)}
          <TableBody>
            {!loading && paginatedProjects?.length>0 && paginatedProjects?.map((row, index) => (
             
              <TableRow hover key={row.name}
                // sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                style={index % 2 ? { background: "#fdfdfd" } : { background: "white" }}>
                <TableCell>{index+1}</TableCell>
                  
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.title}</Typography>
               
                    <Typography variant='caption'
                      style={{
                        color: row.completion_percent === null ? red[500] : row.completion_percent > 0 && row.completion_percent < 100 ? "warning" : "success"
                      }}
                    >
                      {row.completion_percent === null ? "Not Started" : row.completion_percent > 0 && row.completion_percent < 100 ? "In Progress" : "Completed"}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{moment(row.start_date).format('MMMM DD YYYY')}</TableCell>
                <TableCell>{moment(row.end_date).format('MMMM DD YYYY')}</TableCell>

                <TableCell>
                {row.location==null?"Not Indicated":row.location}
                </TableCell>
                <TableCell style={{ display: "flex", }}>
                <Tooltip title="View">
                 <Link to={`/Project-details/${row.id}`}> <RemoveRedEyeOutlined color="success"/></Link>
                            </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteField id={row.id} handleDelete={handleDelete} deleteLoading={deleteLoading}/>
                  </Tooltip>
           
            </TableCell>
              </TableRow>
            ))}

            {loading && <ThemingTable/>}
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

export default ProjectsTable;
