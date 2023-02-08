import { CREATE_ACTIVITIES_FAILURE, CREATE_ACTIVITIES_REQUEST, CREATE_ACTIVITIES_SUCCESS } from "../../Actions/Activities/activities.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const CreateActivityReducer = (state = initialState, action) => {
        switch (action.type) {
            case CREATE_ACTIVITIES_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case CREATE_ACTIVITIES_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case CREATE_ACTIVITIES_FAILURE:
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
export default CreateActivityReducer;