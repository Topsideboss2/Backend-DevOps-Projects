import React, { useEffect } from 'react'
import { useDispatch, u } from 'react-redux'

export default function GetRoles(action,name) {
const dispatch=useDispatch()
const value=name.data
const loading=name.loading

useEffect(() => {
 dispatch(action)
}, [])
return [{value:value,loading:loading}]

}
