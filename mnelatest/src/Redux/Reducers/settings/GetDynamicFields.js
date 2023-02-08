import {  GET_DYNAMIC_FIELD_FAILURE, GET_DYNAMIC_FIELD_REQUEST, GET_DYNAMIC_FIELD_SUCCESS } from "../../Actions/Settings/Setting.type"


 const initialState = {
    loading:false,
    error:"",
    data:[],
    addData:[]
 }
    const GetDynamicFieldReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_DYNAMIC_FIELD_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_DYNAMIC_FIELD_SUCCESS:
             
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case GET_DYNAMIC_FIELD_FAILURE:
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
export default GetDynamicFieldReducer;