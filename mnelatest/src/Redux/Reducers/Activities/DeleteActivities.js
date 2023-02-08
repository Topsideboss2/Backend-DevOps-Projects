import { DELETE_ACTIVITIES_FAILURE, DELETE_ACTIVITIES_REQUEST, DELETE_ACTIVITIES_SUCCESS } from "../../Actions/Activities/activities.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const DeleteActivitiesReducer = (state = initialState, action) => {
        switch (action.type) {
            case DELETE_ACTIVITIES_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case DELETE_ACTIVITIES_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case DELETE_ACTIVITIES_FAILURE:
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
export default DeleteActivitiesReducer;