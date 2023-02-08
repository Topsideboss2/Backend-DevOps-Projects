import { CREATE_PROJECTS_FAILURE, CREATE_PROJECTS_REQUEST, CREATE_PROJECTS_SUCCESS } from "../../Actions/Projects/Projects.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const CreateProjectReducer = (state = initialState, action) => {
        switch (action.type) {
            case CREATE_PROJECTS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case CREATE_PROJECTS_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case CREATE_PROJECTS_FAILURE:
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
export default CreateProjectReducer;