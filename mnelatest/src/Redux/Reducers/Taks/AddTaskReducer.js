import { CREATE_TASKS_FAILURE, CREATE_TASKS_REQUEST, CREATE_TASKS_SUCCESS } from "../../Actions/Task/Task.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const CreateTaskReducer = (state = initialState, action) => {
        switch (action.type) {
            case CREATE_TASKS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case CREATE_TASKS_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case CREATE_TASKS_FAILURE:
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
export default CreateTaskReducer;