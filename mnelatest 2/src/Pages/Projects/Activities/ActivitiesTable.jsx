
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
import { useEffect, useState, useCallback, useContext } from 'react'
import "../../../Assets/styles/styles.css"
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Button, Pagination, Tooltip } from '@mui/material'
import { Add, RemoveRedEyeOutlined } from '@mui/icons-material'
import WithToggle from '../../../Utils/Hoc/ToggleHoc'
import usePagination from '../../../Utils/Hooks/usePagination'
import GetMilestonesAction from '../../../Redux/Actions/Milestones/GetMilestone'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { red } from '@mui/material/colors'
import DeleteField from '../../../Components/modals/Delete'
import DeleteMilestonesAction from '../../../Redux/Actions/Milestones/DeleteMilestone'
import MilestoneContext from '../../../context/MilestonesContext'
import ThemingTable from '../../../SkeletonLoader/ThemeTable'
import AddMilestone from '../Milestones/AddMilestone'
// import UpdateMilestone from './UpdateTask'
// import AddTask from "./AddTask"
import GetTasksAction from '../../../Redux/Actions/Task/GetTasksAction'
import { HandlePagination, PagesCount } from '../../../Components/pagination/PageCounter'
import GetActivitiesAction from "../../../Redux/Actions/Activities/GetAllActivity"
import DeleteTaskAction from '../../../Redux/Actions/Task/DeleteTask'
import DeleteActivitiesAction from '../../../Redux/Actions/Activities/DeleteActivity'





const ActivitiesTable = () => {
  const navigate=useNavigate()
  const [addedMilestone, setAddedMilestone] = useState({})
  const [updatedMilestone, setUpdatedMilestone] = useState({})
  const [adding, setAdding] = useState(false)
  const loading = useSelector(state => state.tasks.loading)
  const deleteLoading = useSelector(state => state.deletedActivity.loading) ?? false
  const [deleting, setDeleting] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [deleteId, setDeleteId] = useState()
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { id ,milestoneId,taskId} = useParams()
  const dispatch = useDispatch()
  const TaskActivities = useSelector(state => state.activities.data)??[]
  const tasks=useSelector(state => state)
  const count =PagesCount(TaskActivities)
  const paginateTasks=HandlePagination( TaskActivities,rowsPerPage)
  const data=usePagination( TaskActivities , rowsPerPage)
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    data.jump(newPage)
  }
  console.log("paginated Activitiess",TaskActivities)
  const handleDelete = (id) => {
    setDeleting(true)
    dispatch( DeleteActivitiesAction(id))
    setTimeout(() => {
      setDeleting(false)
    }, 1000);
  }

  const handleAddedMilestone = useCallback((childData) => {
    setAdding(true)

    setAddedMilestone(childData)
    setTimeout(() => {
      setAdding(true)
    }, 1000);
  }, [addedMilestone, adding])

  const handleUpdate = useCallback((childData, id) => {
    setUpdating(true)
    setUpdateId(id)
    setUpdatedMilestone(childData)
    setTimeout(() => {
      setUpdating(false)
    }, 1000);
  }, [updatedMilestone, updateId])
  useEffect(() => {
    dispatch(GetActivitiesAction(taskId, deleteId, deleting, addedMilestone, adding))
    handleAddedMilestone(TaskActivities)
  }, [deleteId, deleting, adding, addedMilestone])

  return (
    <Card>
      <Box class="right-side m-4">
      <Button variant="outlined"
       startIcon={<Add />} 
       style={{ color: "#00a15d" }} 
       size="large"
        onClick={()=>navigate(`/add-activity/${id}/${milestoneId}/${taskId}`)}>Add Activity</Button>
      </Box>


      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead style={{ backgroundColor: "RGBA(0,161,93,0.27)" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Estimated Cost</TableCell>
              <TableCell>Amount Spent</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
       
          <TableBody>
            {/* {loading && (<ThemingTable/>)} */}
            {TaskActivities?.length > 0 && TaskActivities?.map((row, index) => (
              <TableRow hover key={row.title}
                style={index % 2 ? { background: "#fdfdfd" } : { background: "white" }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.title}</Typography>
                    <Typography
                      style={{
                        color: row.completion_percent === 0 ? red[500] : row.completion_percent > 0 && row.completion_percent < 100 ? "warning" : "success"
                      }} variant='caption'>
                      {row.completion_percent === 0 ? "Not Started" : row.completion_percent > 0 && row.completion_percent < 100 ? "In Progress" : "Completed"}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{moment(row.start_date).format('MMMM DD YYYY')}</TableCell>
                <TableCell>{moment(row.Deadline).format('MMMM DD YYYY')}</TableCell>

                <TableCell>

                  {row.estimated_cost}
                </TableCell>
                <TableCell>

                  {row.actual_cost == null ? `0` : row.actual_cost}
                </TableCell>
                <TableCell style={{ display: "flex" }}>
                  <Tooltip title="View">
                    {/* <Link to={`/milestone-details/${row.id}`}> */}
                       <RemoveRedEyeOutlined color="success" onClick={()=>navigate(`/activity-details/${id}/${milestoneId}/${taskId}/${row.id}`)} />
                       {/* </Link> */}
                  </Tooltip>
                  {/* <Tooltip title="Update">
                    <UpdateTask tid={row.id} milestone={row} handleUpdate={handleUpdate} />
                  </Tooltip> */}
                  <Tooltip title="Delete">
                    <DeleteField mid={row.id} handleDelete={() => handleDelete(row.id)} deleteLoading={deleteLoading} />
                  </Tooltip>
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

export default ActivitiesTable;
