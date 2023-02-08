import {  DELETE_DYNAMIC_REPORT_FAILURE, DELETE_DYNAMIC_REPORT_REQUEST, DELETE_DYNAMIC_REPORT_SUCCESS } from "../../Actions/Settings/Setting.type"


 const initialState = {
    loading:false,
    error:"",
    data:""
 }
    const DeleteDynamicReportReducer = (state = initialState, action) => {
        switch (action.type) {
            case DELETE_DYNAMIC_REPORT_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case DELETE_DYNAMIC_REPORT_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case DELETE_DYNAMIC_REPORT_FAILURE:
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
export default DeleteDynamicReportReducer;