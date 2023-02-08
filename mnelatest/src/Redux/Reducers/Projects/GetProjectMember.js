import { GET_MEMBER_FAILURE, GET_MEMBER_REQUEST, GET_MEMBER_SUCCESS } from "../../Actions/Projects/Projects.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetProjectMemberReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_MEMBER_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_MEMBER_SUCCESS:
                return {
                    ...state,
                    data:action.deleting?action.payload.filter(function(project) {
                        return project.id != action.deleteId }):action.payload,
                    loading:false
                }
                break;
            case GET_MEMBER_FAILURE:
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
export default GetProjectMemberReducer;