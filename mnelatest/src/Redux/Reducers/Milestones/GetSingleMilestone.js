import { GET_SINGLE_MILESTONES_FAILURE, GET_SINGLE_MILESTONES_REQUEST, GET_SINGLE_MILESTONES_SUCCESS } from "../../Actions/Milestones/milestone.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetSingleMilestoneReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_SINGLE_MILESTONES_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_SINGLE_MILESTONES_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case GET_SINGLE_MILESTONES_FAILURE:
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
export default GetSingleMilestoneReducer;