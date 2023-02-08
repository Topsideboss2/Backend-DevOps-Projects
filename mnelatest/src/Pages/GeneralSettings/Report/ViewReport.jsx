import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Pagination,  Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import GetDynamicFieldAction from '../../../Redux/Actions/Settings/GetDynamicFields';
import moment from 'moment';
import usePagination from '../../../Utils/Hooks/usePagination';
import EditField from '../../../Components/modals/EditFields';
import DeleteField from '../../../Components/modals/Delete';
import DeleteDynamicFieldAction from '../../../Redux/Actions/Settings/DeleteDynamicField';
import GetDynamicReportAction from '../../../Redux/Actions/Settings/GetDynamicReports';
import DeleteDynamicReportAction from '../../../Redux/Actions/Settings/DeleteDynamicReport';
import { RemoveRedEye } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { HandlePagination, PagesCount } from '../../../Components/pagination/PageCounter';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  border: '1px solid #5927e3',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ViewReport({dynamicReports,newarr }) {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  // const dynamicReports = useSelector(state => state.dynamicReport.data)
  const getLoading=useSelector(state => state.dynamicReport.data)
  const [active, setActive] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)
  const [addedFields, setAddedFields] = React.useState([])
  const [dynamic ,setDynamic]=React.useState([])
  const [testArr, setTestArr] = React.useState([])
 console.log("dyyy",dynamicReports)

    // pagination
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // pagination
  const count =PagesCount(dynamicReports)
  const paginatedReport=HandlePagination( dynamicReports,rowsPerPage)
  const data=usePagination( dynamicReports , rowsPerPage)
  // const count = Math.ceil(
  //   addedFields.length === 0 ? dynamicReports.length / rowsPerPage : addedFields.length / rowsPerPage
  //   );
  // const _DATA = usePagination(addedFields.length === 0 ? dynamicReports : addedFields, rowsPerPage);
  // const paginatedReport=_DATA.currentData( addedFields.length===0 ? dynamicReports:newarr)
console.log("pagggee",paginatedReport)


  // pagination handlechane
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    data.jump(newPage)
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleDelete=(id)=>{
    dispatch( DeleteDynamicReportAction(id))
  }
  // React.useEffect(() => {
  //   dispatch(GetDynamicReportAction())
  //   setAddedFields(newarr)
  
  // }, [newarr])


  return (
    <Box sx={{ flexGrow: 1, minWidth: "95%" }}>

      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead style={{backgroundColor:"RGBA(0,161,93,0.27)"}}>
            <TableRow>
            <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

          {/* {_DATA.currentData( addedFields.length===0 ? dynamicFields:newarr).map((row,index) => (  */}
          
          {/* { dynamicFields.length===0 && dynamicFields?.map((row,index) => (  */}
          { paginatedReport && paginatedReport.length>0 && paginatedReport.map((row,index) => (
     
           
            
              <TableRow hover key={row.name} 
           
              style ={ index % 2? { background : "#fdfdfd" }:{ background : "white" }}>
                 <TableCell>{index+1}</TableCell>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.report_type_name}</TableCell>
                <TableCell>{moment(row.updated_at).format('MMMM DD YYYY')}</TableCell>

                <TableCell style={{ display: "flex", justifyContent: "flex-start" }}>

                  
                    <Tooltip title="Delete">
                      <RemoveRedEye style={{color:"#00a15d"}} id={row.id} onClick={()=>navigate(`/reports/${row.id}`)}/>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <DeleteField id={row.id} handleDelete={handleDelete}/>
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
    </Box >
  );
}