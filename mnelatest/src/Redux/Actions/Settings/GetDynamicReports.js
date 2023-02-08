 

import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_DYNAMIC_REPORT_FAILURE, GET_DYNAMIC_REPORT_REQUEST, GET_DYNAMIC_REPORT_SUCCESS } from './Setting.type';
 
  const GetDynamicReportAction=(addedArr, adding,deleting,deleteId)=>async(dispatch)=> {
   
    const token=LocalStorage("token")
    console.log("report token",token)
    
    try {
        dispatch({ type: GET_DYNAMIC_REPORT_REQUEST })
        const response = await requests.get(`company/reports`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        console.log('reponse', response);
       

        dispatch({
            type:GET_DYNAMIC_REPORT_SUCCESS,
            payload: response.data,
            deleting:deleting,
            deleteId:deleteId,
            addedArr:addedArr,
            adding:adding
        })
      
       console.log("response.data",response.data)
        
    } catch (error) {
        dispatch({
            type: GET_DYNAMIC_REPORT_FAILURE,
            payload: error.response
        })
        
        
    }
  
 }


 export default GetDynamicReportAction;