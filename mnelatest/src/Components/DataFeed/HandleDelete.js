import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const HandleDelete = (action,id,stateName) => {
    const dispatch=useDispatch()
    const [deleting, setDeleting] = useState(false)
    const [deleteId,setDeleteId]=useState()
  const deleteLoading=useSelector(state => state.stateName.loading)
  setDeleteId(id)
  setDeleting(true)
  dispatch(action(id))
  setTimeout(() => {
    setDeleting(false)
  }, 1000);
  return (
    {
        deleteLoading:deleteLoading,
        deleteId:deleteId,
        deleting:deleting,
    }
  )
}
