import React, { createContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';




export default function CompanyUsers(props) {
    const dispatch=useDispatch()
    const CompanyUsers=useSelector(state=>state.companyUsers.data)
    const loading =useSelector(state=>state.companyUsers.loading)
  
  return CompanyUsers
  
   
  
  
}