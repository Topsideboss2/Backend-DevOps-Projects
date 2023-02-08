import { add } from 'lodash'
import React, { useState } from 'react'


 const HandleAdded =(childData) => {
    const [adding,setAdding]=useState(false)
    const [addedArr,setAddedArr]=useState({})

   if( Object.keys(childData).length>0){
        setAddedArr(childData)
       
        
    }
    return [{adding:adding,addedArr:addedArr}]
   
    
   
  
       
      }
export default HandleAdded;
