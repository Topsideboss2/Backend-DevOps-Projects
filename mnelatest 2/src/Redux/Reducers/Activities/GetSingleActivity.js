import { GET_SINGLE_ACTIVITY_FAILURE, GET_SINGLE_ACTIVITY_REQUEST, GET_SINGLE_ACTIVITY_SUCCESS } from "../../Actions/Activities/activities.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const GetSingleActivityReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_SINGLE_ACTIVITY_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_SINGLE_ACTIVITY_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case GET_SINGLE_ACTIVITY_FAILURE:
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
export default GetSingleActivityReducer;