import { DELETE_TASKS_FAILURE, DELETE_TASKS_REQUEST, DELETE_TASKS_SUCCESS } from "../../Actions/Task/Task.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const DeleteTaskReducer = (state = initialState, action) => {
        switch (action.type) {
            case DELETE_TASKS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case DELETE_TASKS_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case DELETE_TASKS_FAILURE:
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
export default DeleteTaskReducer;