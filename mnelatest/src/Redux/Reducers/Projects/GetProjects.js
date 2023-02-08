import { GET_PROJECTS_FAILURE, GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS } from "../../Actions/Projects/Projects.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
    
    
 }
    const GetProjectReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_PROJECTS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_PROJECTS_SUCCESS:
                return {
                    ...state,
                    data:action.deleting?action.payload.filter(function(project) {
                        return project.id != action.deleteId }):action.payload,
                    loading:false
                }
                break;
            case GET_PROJECTS_FAILURE:
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
export default GetProjectReducer;