import {  CREATE_DYNAMIC_REPORT_FAILURE, CREATE_DYNAMIC_REPORT_REQUEST, CREATE_DYNAMIC_REPORT_SUCCESS } from "../../Actions/Settings/Setting.type"


 const initialState = {
    loading:false,
    error:"",
    data:{},
    satus:""
 }
    const CreateDynamicReportReducer = (state = initialState, action) => {
        switch (action.type) {
            case CREATE_DYNAMIC_REPORT_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case CREATE_DYNAMIC_REPORT_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false,
                    status:action.status

                }
                break;
            case CREATE_DYNAMIC_REPORT_FAILURE:
                return {
                    ...state,
                    error:action.payload,
                    loading:false,
                    status:action.status
                }
                break;
            default:
                return state;
                break;

    }
}
export default CreateDynamicReportReducer;