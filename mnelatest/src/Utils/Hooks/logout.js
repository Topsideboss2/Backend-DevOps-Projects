// import React from 'react'
// import { useDispatch } from 'react-redux'
// import Swal from 'sweetalert2'
// import SwitchActiveAction from '../../Redux/Actions/Companies/SwitchActive'
import { RemoveLocalStorage } from './useLocalStorage'

export default function Logout() {
   
    try {
        RemoveLocalStorage("user")
        RemoveLocalStorage("token")
        RemoveLocalStorage("userPermissions")
       
    } catch (error) {
       console.log("error")
        
    }
}
