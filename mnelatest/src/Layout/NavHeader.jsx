import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GetActiveAction from '../Redux/Actions/Companies/GetActive.action';
import { LocalStorage } from '../Utils/Hooks/useLocalStorage';
import ProfileAvatar from "../Utils/Components/Initials"
import SwitchActiveAction from '../Redux/Actions/Companies/SwitchActive';
import Logout from '../Utils/Hooks/logout';
import { Divider } from '@mui/material';

export default function NavHeader() {
    const location = useLocation();
    const user=LocalStorage("user");
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const activeCompany=useSelector(state=>state.activeCompany.data)
    const pathname=location.pathname.replace('/','')
    // const pathnameProcessed2=pathname.replace("-"," ")
    const pathnameProcessed= pathname.slice(0,pathname.indexOf("/"))
    const pathnameProcessed2=pathnameProcessed.replace("-"," ") 
     
    
     
    const SwitchCompany=()=>{
        const data={company_id:activeCompany.id}
        dispatch(SwitchActiveAction(data))
    }
    const logout=()=>{
        Logout()
        setTimeout(() => {
            navigate('/login')
          }, 2000);

    }
    

    useEffect(() => {
      dispatch(GetActiveAction())
    }, [])
    
    return (
        <div class="header">
            <div class="header-content">
                <nav class="navbar navbar-expand">
                    <div class="collapse navbar-collapse justify-content-between">
                        <div class="header-left">
                            <div class="dashboard_bar text-capitalize">
                                {`${!pathname===true?"Dashboard":pathnameProcessed2}`}
                            </div>
                        </div>
                        <ul class="navbar-nav header-right">
                            {/* <li class="nav-item d-flex align-items-center">
								<div class="input-group search-area">
									<input type="text" class="form-control" placeholder="Search here..."/>
									<span class="input-group-text"><a href="#"><i class="flaticon-381-search-2"></i></a></span>
								</div>
							</li> */}

                            <li class="nav-item dropdown header-profile">
                                <a class="nav-link"  role="button" data-bs-toggle="dropdown">
                                    {/* <img src="images/user.jpg" width="20" alt=""/> */}
                                    <ProfileAvatar name={user && user.name}/>
									
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                {/* <div class="header-info ms-3">
										<span class="fs-18 font-w500 mb-2">{user && user.name}</span>
										<small class="fs-12 font-w400">{user && user.email}</small>
									</div> */}
                                    <div class="text-center">
                                        <h6 style={{fontSize:"1.5em",fontWeight:600}}>{user && user.name}</h6>
                                        <p style={{fontSize:"0.9em",fontWeight:400}}>{user && user.email}</p>
                                    </div>
                                    <Divider/>
                                    <a href ={`/user-profile`} class="dropdown-item ai-icon">
                                        <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" class="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        <span class="ms-2">Profile </span>
                                    </a>
                                    <Link to="/my-companies" class="dropdown-item ai-icon" onClick={()=>{
                                    SwitchCompany()
                                    
                                  }}>
									<i class="bi bi-toggles"></i>
                                        <span class="ms-2">switch companies</span>
                                    </Link>
                                    <Link   class="dropdown-item ai-icon" onClick={() => {
										logout()
									
										
									}}>
                                        <svg style={{color:"#00a15d"}} id="icon-logout" xmlns="http://www.w3.org/2000/svg" class="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                        <span class="ms-2">Logout </span>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}
