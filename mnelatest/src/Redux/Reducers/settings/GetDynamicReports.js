import {  GET_DYNAMIC_REPORT_FAILURE, GET_DYNAMIC_REPORT_REQUEST, GET_DYNAMIC_REPORT_SUCCESS } from "../../Actions/Settings/Setting.type"


 const initialState = {
    loading:false,
    error:"",
    data:{},
    dataarr:[]
 }
    const GetDynamicReportReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_DYNAMIC_REPORT_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_DYNAMIC_REPORT_SUCCESS:
                return {
                    ...state,
                    // data:action.deleting?action.payload.filter(function(field) {
                    //     return field.id != action.deleteId })
                    //     :(Object.keys(action.addedArr).length>0)?action.payload.unshift(action.addedArr):
                    //     action.payload,
                    // data:action.payload,
                    data:action.payload,
                    loading:false
                }
                break;
            case GET_DYNAMIC_REPORT_FAILURE:
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
export default GetDynamicReportReducer;