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
import TableLoaders from '../../../Components/loaders/TableLoaders';
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
export default function ViewField({newarr,dynamicFields, adding, addedArr}) {
  const dispatch = useDispatch()
  // const dynamicFields = useSelector(state => state.dynamicField.data)
  const loadingState=useSelector(state => state.dynamicFieldloading)
  const [active, setActive] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)
  const [addedFields, setAddedFields] = React.useState([])
  const [dynamic ,setDynamic]=React.useState([])
  const [testArr, setTestArr] = React.useState([])
  const deleteLoading=useSelector(state => state.deleteProject.loading)
  const [deleting, setDeleting] = React.useState(false)
  const [deleteId,setDeleteId]=React.useState()

    // pagination
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // pagination
  const PER_PAGE = 14;

  const count = Math.ceil(dynamicFields.length / PER_PAGE);
  const _DATA = usePagination(dynamicFields, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const paginatedField=_DATA.currentData()
  console.log("added arr",addedArr)
  console.log('paginatedField', paginatedField)

  // const mergedArray = [...addedArr, ...paginatedField]
  // console.log('mergedArray')
  const data=usePagination( dynamicFields , rowsPerPage)
  console.log("paginated Fields",paginatedField)
  const handleEditOpen = () => {
    openEdit ? setOpenEdit(false) : setOpenEdit(true)
  }

  const handleDeleteOpen = () => {
    openDelete ? setOpenDelete(false) : setOpenDelete(true)
  }
  const newsector = (childData) => {
    let x = []
    setAddedFields(oldarr => [...dynamicFields, childData])
  }
  // pagination handlechane
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    data.jump(newPage)
    console.log("page",page)
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete=(id)=>{
    console.log("newarr",id)

    setDeleting(true)
    setDeleteId(id)
    dispatch(DeleteDynamicFieldAction(id))
  }
  React.useEffect(() => {
    dispatch(GetDynamicFieldAction(deleting,deleteId))
    const x=data.currentData(dynamicFields)
    setDynamic(prev=>[...prev,x])
   
  
  }, [deleting,deleteId,addedArr])
  console.log("added ",addedFields)


  


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
          {loadingState &&(
            <TableLoaders />
          )}
          {!loadingState  &&(
             <TableBody>
             {/* {_DATA?.currentData( addedFields.length===0 ? dynamicFields:newarr).map((row,index) => (            */}
          {/* {dynamicFields.length >0 &&dynamicFields.map((row,index) => ( */}
           { paginatedField && (paginatedField.length>0 && paginatedField).map((row,index) => (
     
            <TableRow hover key={row.name} 
         
            style ={ index % 2? { background : "#fdfdfd" }:{ background : "white" }}>
               <TableCell>{index+1}</TableCell>
              <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                  <Typography variant='caption'>{row.designation}</Typography>
                </Box>
              </TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{moment(row.updated_at).format('MMMM DD YYYY')}</TableCell>

              <TableCell style={{ display: "flex", justifyContent: "flex-start" }}>
                  {/* <Tooltip title="Delete"> */}
                    <DeleteField id={row.id} handleDelete={handleDelete} deleteLoading={deleteLoading}/>
                  {/* </Tooltip> */}
           
            </TableCell>
            </TableRow>
          ))}
        

      </TableBody>
          )}
        
      </Table>
    </TableContainer>

    <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Box >
  );
}