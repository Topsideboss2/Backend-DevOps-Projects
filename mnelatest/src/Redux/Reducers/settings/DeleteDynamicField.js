import {  DELETE_DYNAMIC_FIELD_FAILURE, DELETE_DYNAMIC_FIELD_REQUEST, DELETE_DYNAMIC_FIELD_SUCCESS } from "../../Actions/Settings/Setting.type"


 const initialState = {
    loading:false,
    error:"",
    data:""
 }
    const DeleteDynamicFieldReducer = (state = initialState, action) => {
        switch (action.type) {
            case DELETE_DYNAMIC_FIELD_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case DELETE_DYNAMIC_FIELD_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case DELETE_DYNAMIC_FIELD_FAILURE:
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
export default DeleteDynamicFieldReducer;