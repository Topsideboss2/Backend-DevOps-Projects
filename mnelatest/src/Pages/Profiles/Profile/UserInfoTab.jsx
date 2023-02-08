import React from 'react'
import UpdateUser from './usertab/UpdateUser'
import ViewUser from './usertab/ViewUser'

export default function UserInfoTab() {
  return (
    <div class="card">
    <div class="card-body ">
        <div class="profile-tab h-auto">
            <div class="custom-tab-1">
                <ul class="nav nav-tabs">
                    
                    <li class="nav-item active"><a href="#about-me" data-bs-toggle="tab" class="nav-link">About me</a>
                    </li>
                   
                </ul>
                <div class="tab-content">
                   
                    <div id="about-me active" class="tab-pane fade active show">
                        <ViewUser/>
                    </div>
                    <div id="profile-settings" class="tab-pane fade">
                        <UpdateUser/>
                    </div>
                </div>
            </div>
     
            
        </div>
    </div>
</div>
  )
}
