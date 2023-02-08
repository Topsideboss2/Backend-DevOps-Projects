
import {  GET_REPORT_TYPE_FAILURE, GET_REPORT_TYPE_REQUEST, GET_REPORT_TYPE_SUCCESS } from "../../Actions/Settings/Reports/Report.type" 


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetReportTypeReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_REPORT_TYPE_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_REPORT_TYPE_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case GET_REPORT_TYPE_FAILURE:
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
export default GetReportTypeReducer;