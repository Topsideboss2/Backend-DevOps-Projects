import React, { useState }  from 'react'
import { LocalStorage } from '../Utils/Hooks/useLocalStorage'
import Chatbox from './Chatbox'
import Header from './Header'
import NavHeader from './NavHeader'
import Sidebar from './Sidebar'




export default function Layout({children}) {
   const [active,setActive]=useState(false)
  const permissions=LocalStorage("userPermissions")

  const IsActiveChild=(isActive)=>{
    console.log("isActive",isActive)
    setActive(isActive)
  }


  return (
    <div    className={active ?" show menu-toggle" :""}>
        {/* {loading && <Loader />} */}
        <div>
        <Header  style={{background:" #00a15d",float:"right"}} isActiveChild={IsActiveChild}/>
        {/* <Chatbox /> */}
        <NavHeader />

       {/* {permissions && permissions?.length>0 &&( */}
        <Sidebar/>
     
        
        </div>
        <div class="content-body">
            <div class="container-fluid">
            {children}
            </div>
        </div>
    </div>
  )
}
