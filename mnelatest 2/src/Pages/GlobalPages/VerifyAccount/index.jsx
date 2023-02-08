import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import image from "../../../Assets/custom/verify.png"
import "./verify.css"

class VerifyAccount extends Component {


    render() {
       
     
  
      return (
        // <div  class="verifyy"style={{display:"grid",placeItems:"center",paddingTop:"140px",top:"50%",transform:"translate Y(-50%"}}>
        <div class="vh-100" style={{overflow:"hidden"}}>
            <div class="authincation h-100">
                <div class="container h-100">
                    <div class="row justify-content-center h-100 align-items-center">
                        <div class="col-md-6" style={{top:"50%",transform:"translate Y(-50%)",padding:"15px"}}>
                            <div class="authincation-content" >
                                <div class="row no-gutters">
                                    <div class="col-xl-12">
                                        <div class="auth-form">
                                            <div class="text-center mb-3">
                                                <Link to="/"><h1 style={{color:"#00a15d"}}>Success</h1></Link>
                                            </div>
                                           
                                            <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                                            <p style={{fontSize:"1.5em"}}>check your email to verify your account </p>
                                            < img src={image } alt="verify email" height="200px" width="200px"/>
                                           
                                            </div>

                                            <div style={{display:"flex",justifyContent:"space-between"}}  >
                                            <Link to="/"><button class="btn btn-outline-success "> Home</button></Link>
                                                <Link to="/login" style={{fontSize:"1.5em"}}>go to login</Link>
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
        
      );
    }
  }
  
  export default VerifyAccount;