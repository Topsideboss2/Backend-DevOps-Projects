import { GET_SINGLE_PROJECTS_FAILURE, GET_SINGLE_PROJECTS_REQUEST, GET_SINGLE_PROJECTS_SUCCESS } from "../../Actions/Projects/Projects.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const GetSingleProjectReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_SINGLE_PROJECTS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_SINGLE_PROJECTS_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case GET_SINGLE_PROJECTS_FAILURE:
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
export default GetSingleProjectReducer;