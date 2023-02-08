import { GET_TASK_REPORT_FAILURE, GET_TASK_REPORT_REQUEST, GET_TASK_REPORT_SUCCESS } from "../../Actions/Reports/report.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetTaskReportReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_TASK_REPORT_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_TASK_REPORT_SUCCESS:
                console.log("userdata",action.payload)
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                    
                }
                break;
            case GET_TASK_REPORT_FAILURE:
                return {
                    ...state,
                    error:action.payload,
                    loading:false
                }
                break;
            default:
                return state;
                break;

    }
}
export default GetTaskReportReducer ;