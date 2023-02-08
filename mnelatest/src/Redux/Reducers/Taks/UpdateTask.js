import { UPDATE_TASKS_FAILURE, UPDATE_TASKS_REQUEST, UPDATE_TASKS_SUCCESS } from "../../Actions/Task/Task.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const UpdateTaskReducer = (state = initialState, action) => {
        switch (action.type) {
            case UPDATE_TASKS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case UPDATE_TASKS_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case UPDATE_TASKS_FAILURE:
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
export default UpdateTaskReducer;