import { DELETE_PROJECTS_FAILURE, DELETE_PROJECTS_REQUEST, DELETE_PROJECTS_SUCCESS } from "../../Actions/Projects/Projects.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const DeleteProjectReducer = (state = initialState, action) => {
        switch (action.type) {
            case DELETE_PROJECTS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case DELETE_PROJECTS_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case DELETE_PROJECTS_FAILURE:
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
export default DeleteProjectReducer;