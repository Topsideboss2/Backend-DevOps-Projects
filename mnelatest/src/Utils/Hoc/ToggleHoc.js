import {useState} from "react";
const WithToggle=(WrappedComponent)=>{
    function WithToggle(){
        const [open,setOpen]=useState(false)
        return <WrappedComponent isShown={open} toogle={()=> setOpen(prev =>!prev)}/>
    }
    return WithToggle

}
export default WithToggle