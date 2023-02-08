import React,{useState,useEffect} from 'react'
import CompanyProjects from './CompanyProjectsInfo'
import UpdateCompanyProfile from './UpdateCompanyProfile'
import ViewCompanyProfile from './ViewCompanyProfile';
// import Avatar from 'react-avatar';
import MyCompanyProjects from './myCompanyProjects'
// import {Typography} from '@material-ui/core'
// import image from "../../images/custom/10.png"
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import ProfileAvatar from '../../../Utils/Components/Initials';


export default function CompanyProfile() {
const [company,setCompany]=useState([])
const [activedata,setActiveData]=useState({})
const token=LocalStorage("token")
    const getcompany=async()=>{
        await requests.get(`users/companies`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{
    
            setCompany(response.data)
         console.log(" company data",company)
    
        }).catch((error)=>{
            console.log("all companies error",error)
        })
      }
      const checkActive = async () => {
        await requests.get(`/company/active`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(response => {
          console.log("activepp", response.data)    
         setActiveData(response.data)
        }).catch(error => {
         console.log("error",error)
        })
      }
      useEffect(()=>{
          getcompany()
          checkActive()
      },[])
  return (
    <div class="">
    <div class="container-fluid">
        
        
        {/* <div class="row page-titles">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active"><a href="javascript:void(0)">App</a></li>
                <li class="breadcrumb-item"><a href="javascript:void(0)">Profile</a></li>
            </ol>
        </div> */}
        {/* <!-- row --> */}
        <div class="row">
            <div class="col-lg-12">
                <div class="profile card card-body px-3 pt-2 pb-0">
                    <div class="profile-head">
                        <div class="photo-content">
                            <div class="rounded"style={{ background:`url(../../images/custom/5.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "15.625rem",
    width: "100%"}} ></div>
                        </div>
                        <div class="profile-info">
                        {company.map((c)=>(
                            <div>
                            <div class="profile-photo">
                            {/* <ConfigProvider colors={["pink",'purple', 'green', 'blue',"cyan","magenta","lime"]}>
                                <div>
                                    
                                        <Avatar name={c.company_name}/>
                                   
                                    
                                    
                                </div>
                            </ConfigProvider> */}
                             <ProfileAvatar name={c && c.company_nam}/>
                                {/* <img src="images/profile/profile.png" class="img-fluid rounded-circle" alt=""/> */}
                                {/* <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue',"purple"])} name="Wim Mostmans" class="img-fluid rounded-circle" /> */}
                                {/* <Avatar {...stringAvatar('Kent Dodds')} class="img-fluid rounded-circle" /> */}
                            </div>
                            <div class="profile-details">
                                <div class="profile-name px-3 pt-2">
                                    <h4 class="text-primary mb-0">{c.company_name}</h4>
                                    <p>{c.company_role}</p>
                                </div>
                                <div class="profile-email px-2 pt-2">
                                    <h4 class="text-muted mb-0">{activedata.email}</h4>
                                    <p>{activedata.phone}</p>
                                </div>
                            </div>
                            </div>
                         ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4">
                <div class="row">
                    <CompanyProjects/>
                    
                    <MyCompanyProjects/>
                    
                </div>
            </div>
            <div class="col-xl-8">
                <div class="card">
                    <div class="card-body ">
                        <div class="profile-tab h-auto">
                            <div class="custom-tab-1">
                                <ul class="nav nav-tabs">
                                    
                                    <li class="nav-item active"><a href="#about-me" data-bs-toggle="tab" class="nav-link">About Company</a>
                                    </li>
                                    <li class="nav-item"><a href="#profile-settings" data-bs-toggle="tab" class="nav-link">Update Company</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                   
                                    <div id="about-me" class="tab-pane fade active show">
                                        <ViewCompanyProfile/>
                                    </div>
                                    <div id="profile-settings" class="tab-pane fade">
                                       <UpdateCompanyProfile/>
                                    </div>
                                </div>
                            </div>
                     
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
