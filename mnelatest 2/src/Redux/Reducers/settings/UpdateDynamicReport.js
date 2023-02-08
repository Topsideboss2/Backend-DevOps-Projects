import {  UPDATE_DYNAMIC_REPORT_FAILURE, UPDATE_DYNAMIC_REPORT_REQUEST, UPDATE_DYNAMIC_REPORT_SUCCESS } from "../../Actions/Settings/Setting.type"


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const UpdateDynamicReportReducer = (state = initialState, action) => {
        switch (action.type) {
            case UPDATE_DYNAMIC_REPORT_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case UPDATE_DYNAMIC_REPORT_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case UPDATE_DYNAMIC_REPORT_FAILURE:
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
export default UpdateDynamicReportReducer;