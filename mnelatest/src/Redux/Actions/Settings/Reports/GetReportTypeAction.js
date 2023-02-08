
import { LocalStorage } from '../../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../../Utils/Services/Api';
import { GET_REPORT_TYPE_FAILURE, GET_REPORT_TYPE_REQUEST, GET_REPORT_TYPE_SUCCESS } from './Report.type';
 
  const GetReportTypeAction=()=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_REPORT_TYPE_REQUEST })
        const response = await requests.get(`/reporttypes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GET_REPORT_TYPE_SUCCESS,
            payload: response.data
        })
      
       
        
    } catch (error) {
        dispatch({
            type: GET_REPORT_TYPE_FAILURE,
            payload: error.response.data
        })
        
        
    }
  
 }
 export default GetReportTypeAction;