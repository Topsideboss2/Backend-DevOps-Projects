
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
import { Pagination, Tooltip } from '@mui/material'
import { RemoveRedEyeOutlined } from '@mui/icons-material'
import WithToggle from '../../../Utils/Hoc/ToggleHoc'
import usePagination from '../../../Utils/Hooks/usePagination'
import AddMilestone from './AddMilestone'
import GetMilestonesAction from '../../../Redux/Actions/Milestones/GetMilestone'
import { Link, useParams } from 'react-router-dom'
import { red } from '@mui/material/colors'
import DeleteField from '../../../Components/modals/Delete'
import DeleteMilestonesAction from '../../../Redux/Actions/Milestones/DeleteMilestone'
import UpdateMilestone from './UpdateMilestone'
import MilestoneContext from '../../../context/MilestonesContext'
import ThemingTable from '../../../SkeletonLoader/ThemeTable'
import { HandlePagination, PagesCount } from '../../../Components/pagination/PageCounter'





const MilestonesTable = (props, { isShown, toogle ,projectName}) => {

  const [addedMilestone, setAddedMilestone] = useState({})
  const [updatedMilestone, setUpdatedMilestone] = useState({})
  const [adding, setAdding] = useState(false)
  const loading = useSelector(state => state.milestones.loading)
  const deleteLoading = useSelector(state => state.deleteMilestone.loading) ?? false
  const [deleting, setDeleting] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [deleteId, setDeleteId] = useState()
  const { id } = useParams()
  const { handleMilestones } = useContext(MilestoneContext)
  const dispatch = useDispatch()
  const ProjectMilestones = useSelector(state => state.milestones.data)


  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // pagination
  const count =PagesCount(ProjectMilestones)
  const paginatedMilestones=HandlePagination( ProjectMilestones,rowsPerPage)
  const data=usePagination( ProjectMilestones , rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    data.jump(newPage)
  };
  const handleDelete = (id) => {
    setDeleting(true)
    dispatch(DeleteMilestonesAction(id))
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
    dispatch(GetMilestonesAction(id, deleteId, deleting, addedMilestone, adding))
    handleAddedMilestone(ProjectMilestones)
  }, [deleteId, deleting, adding, addedMilestone])

console.log("projectMi;e",ProjectMilestones)
  return (
    <Card>
      <Box class="right-side m-4">
        <AddMilestone handleAddedMilestone={handleAddedMilestone} />
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
         { console.log("loading",loading)}
          <TableBody>
           
            {!loading && paginatedMilestones?.length > 0 && paginatedMilestones?.map((row, index) => (
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
                    <Link to={`/milestone-details/${id}/${row.id}`}> <RemoveRedEyeOutlined color="success" /></Link>
                  </Tooltip>
                  <Tooltip title="Update">
                    <UpdateMilestone mid={row.id} milestone={row} handleUpdate={handleUpdate} />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteField mid={row.id} handleDelete={() => handleDelete(row.id)} deleteLoading={deleteLoading} />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
             {loading && (<ThemingTable/>)}
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

export default MilestonesTable
