import React, { useState } from 'react'
// import Sidebar from '../sidebar/Sidebar';

import image2 from "../Assets/images/logo/darkmode.png"
export default function Header({isActiveChild}) {
  const [isActive,setIsActive]=useState(false)
 
  const handleClick = event => {
    const data={active:isActive}
    setIsActive(current => !current);
    isActiveChild(isActive)
  };


  return (
    <div class="nav-header shadow p-3 m-0"  style={{background:" #00a15d"}}>
            <a href="/" class="brand-logo">
				<div class="brand-title p-2">
					
               <img src={image2} alt="logo" style={{height:"70%",width:"70%"}}/>
					
				</div>
            </a>
            <div class="nav-control">
                <div
                 class={isActive?`hamburger is-active`:`hamburger`}  onClick={handleClick}
                 >
                    <span class="line"></span><span class="line"></span><span class="line"></span>
                   
                   
                 </div> 
            </div>
            
        </div>
  )
}
