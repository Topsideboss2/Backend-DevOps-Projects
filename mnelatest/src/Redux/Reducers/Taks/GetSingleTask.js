import { GET_SINGLE_TASKS_FAILURE, GET_SINGLE_TASKS_REQUEST, GET_SINGLE_TASKS_SUCCESS } from "../../Actions/Task/Task.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const GetSingleTaskReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_SINGLE_TASKS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_SINGLE_TASKS_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case GET_SINGLE_TASKS_FAILURE:
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
export default GetSingleTaskReducer;