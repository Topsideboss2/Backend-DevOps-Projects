import React, { useCallback, useEffect, useId, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import classNames from "classnames";
// import ability from "../../Config/TestCan"
import GridViewIcon from '@mui/icons-material/GridView';
import MemberAvatar from '../Utils/Components/AvatarGroupp';
import "../Assets/styles/styles.css"
import "./style.css"
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import WithToggle from '../Utils/Hoc/ToggleHoc';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AddMembers from '../Components/modals/AddMembers';
import { useDispatch, useSelector } from 'react-redux';
import GetCompanyUserAction from '../Redux/Actions/Users/GetUsersAction';
import Toggle from '../Utils/Hooks/UseToggle';


function Sidebar({ isShown, toogle, isOpen }) {
  const id = useId()
  const [{setting,projects,reports,accesscontrol}, setRefState] = useState({})
  const dispatch = useDispatch()
  const [open, setOpen] = Toggle(false,{
    setting:setting,projects:projects,reports:reports,accesscontrol:accesscontrol})
  const companyUsers = useSelector(state => state.companyUsers.data)
  
  const setRef = useCallback((node) => {
    setRefState(prevState =>
    ({ ...prevState, [node.dataset.refkey]: node }
    ))

  },
    [],
  )



  useEffect(() => {
    dispatch(GetCompanyUserAction())
  }, [])

  return (
    <div class="dlabnav" {...classNames("sidebar", { "is-open": isOpen })}>
      <div class="dlabnav-scroll">
        <ul class="metismenu" id="menu">
          <li class="chh"><Link to='/' aria-expanded="false">
            <GridViewIcon />
            <span class="nav-text">Dashboard</span>
          </Link>
          </li>

          {/* {ability.can("view", "company-single-companysetting") && ( */}
          <li class="chh"><div onClick={setOpen} ref={setRef} data-refkey="setting">
            <a class="has-arrow " aria-expanded="false">
              <SettingsOutlinedIcon />
              <span class="nav-text sub-t"> Settings</span>
            </a>
          </div>
            {open && (
              <ul aria-expanded="false">
                <li><Link to='/general-settings'> Settings</Link></li>

              </ul>
            )}

          </li>

          {/* )} */}

          <li class="chh">
            <div onClick={setOpen} ref={setRef} data-refkey="projects"><a class="has-arrow " href="javascript:void()" aria-expanded="false">
              <AccountTreeOutlinedIcon />
              <span class="nav-text sub-t">Projects</span>
            </a></div>
            {open && (
              <ul aria-expanded="false">
                {/* {ability.can("view", "company-projects") && ( */}
                <li><Link to='/projects'>Projects</Link></li>
                {/* )} */}
                {/* {ability.can("add", "projects") && ( */}
                <li><Link to='/add-projects'>Add project</Link></li>

                {/* )} */}


              </ul>
            )}
          </li>
          <li class="chh">
            <div onClick={setOpen} ref={setRef} data-refkey="reports">
              <a class="has-arrow " aria-expanded="false">
                <i class="fas fa-chart-line"></i>
                <span class="nav-text sub-t">Reports</span>
              </a>
            </div>
            {open && (
              <ul aria-expanded="false">
                <li><Link to='/reporttable'>View Dynamic Reports</Link></li>
              </ul>
            )}
          </li>

          <li class="chh">
            <div onClick={setOpen} ref={setRef} data-refkey="accesscontrol">
              <a class="has-arrow " href="javascript:void()" aria-expanded="false">
                <ShieldOutlinedIcon />
                <span class="nav-text sub-t">Access Control</span>
              </a>
            </div>
            {open && (
              <ul aria-expanded="false">
                <li><Link to="/myroles"> Add Roles</Link></li>

              </ul>
            )}
          </li>



        </ul>
      </div>
    </div>
  )
}

export default WithToggle(Sidebar);