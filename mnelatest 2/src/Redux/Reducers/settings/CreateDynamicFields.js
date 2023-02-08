import {  CREATE_DYNAMIC_FIELD_FAILURE, CREATE_DYNAMIC_FIELD_REQUEST, CREATE_DYNAMIC_FIELD_SUCCESS } from "../../Actions/Settings/Setting.type"


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const CreateDynamicFieldReducer = (state = initialState, action) => {
        
        switch (action.type) {
            case CREATE_DYNAMIC_FIELD_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case CREATE_DYNAMIC_FIELD_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case CREATE_DYNAMIC_FIELD_FAILURE:
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
export default CreateDynamicFieldReducer;