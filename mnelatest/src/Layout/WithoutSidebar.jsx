import React  from 'react'
import { LocalStorage } from '../Utils/Hooks/useLocalStorage'
import Chatbox from './Chatbox'
import Header from './Header'
import NavHeader from './NavHeader'
import Sidebar from './Sidebar'




export default function NoSideBarLayout({children}) {
   
 


  return (
    <div   >
        {/* {loading && <Loader />} */}
        <div>
        <Header  style={{background:" #00a15d",float:"right"}}/>
        {/* <Chatbox /> */}
        <NavHeader />

    
        </div>
        <div class="">
            <div class="container-fluid" style={{marginTop:"7.8rem"}}>
            {children}
            </div>
        </div>
    </div>
  )
}
