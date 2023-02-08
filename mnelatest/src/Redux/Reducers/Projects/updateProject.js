import { UPDATE_PROJECTS_FAILURE, UPDATE_PROJECTS_REQUEST, UPDATE_PROJECTS_SUCCESS } from "../../Actions/Projects/Projects.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const UpdateProjectReducer = (state = initialState, action) => {
        switch (action.type) {
            case UPDATE_PROJECTS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case UPDATE_PROJECTS_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case UPDATE_PROJECTS_FAILURE:
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
export default UpdateProjectReducer;