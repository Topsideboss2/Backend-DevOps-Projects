import React from 'react'
import MyCompanyProjects from './myCompanyProjects'
import UserInfoTab from './UserInfoTab'
import UserProject from './UserProject'
import image from "../../../Assets/custom/6.png"
import ProfileAvatar from '../../../Utils/Components/Initials';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage'


function UserProfile() {
    const user =LocalStorage("user")
    const data = [
        { "name": "project1", "id": "1" },
        { "name": "project2", "id": "1" },
        { "name": "project3", "id": "1" },
        { "name": "project4", "id": "1" },
        { "name": "project5", "id": "1" },
    ]
    const datap = data.slice(0, 3)
    return (
        <div class="">
            <div class="container-fluid">

                {/*         
        <div class="row page-titles">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active"><a href="javascript:void(0)">App</a></li>
                <li class="breadcrumb-item"><a href="javascript:void(0)">Profile</a></li>
            </ol>
        </div> */}
                {/* <!-- row --> */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="profile card card-body px-1  pb-0">
                            <div class="profile-head">
                                <div class="photo-content" style={{position:"relative"}}>
                                    <div class=" rounded" >
                                    <img src={image} alt="profile"style={{
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        minHeight: "15.625rem",
                                        width: "100%"
                                    }}/>
                                    
                                    {/* //     backgroundImage: `url("../../../Assets/custom/8.png")`,
                                    //     backgroundSize: "cover",
                                    //     backgroundPosition: "center",
                                    //     minHeight: "15.625rem",
                                    //     width: "100%"
                                    // }} > */}

                                    </div>
                                </div>
                                <div class="profile-info">
                                    <div class="profile-photo">
                                        {/* <ConfigProvider colors={["pink", 'purple', 'green', 'blue', "cyan", "magenta", "lime"]}>
                                            <div>
                                                <Avatar name={user.name} />
                                            </div>
                                        </ConfigProvider> */}
                                        <ProfileAvatar name={user && user.name}/>
                                    </div>
                                    <div class="profile-details">
                                        <div class="profile-name px-3 pt-2">
                                            <h4 class="text-primary mb-0">{user.name}</h4>

                                        </div><br/>
                                        <div class="profile-email px-2 pt-2">
                                            <h4 class="text-muted mb-0">{user.email}</h4>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4">
                        <div class="row">
                            <UserProject />

                            <MyCompanyProjects />

                        </div>
                    </div>
                    <div class="col-xl-8">
                        <UserInfoTab />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile