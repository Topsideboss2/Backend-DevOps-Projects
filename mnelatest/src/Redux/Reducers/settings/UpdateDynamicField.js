import {  UPDATE_DYNAMIC_FIELD_FAILURE, UPDATE_DYNAMIC_FIELD_REQUEST, UPDATE_DYNAMIC_FIELD_SUCCESS } from "../../Actions/Settings/Setting.type"


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const UpdateDynamicFieldReducer = (state = initialState, action) => {
        switch (action.type) {
            case UPDATE_DYNAMIC_FIELD_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case UPDATE_DYNAMIC_FIELD_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case UPDATE_DYNAMIC_FIELD_FAILURE:
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
export default UpdateDynamicFieldReducer;