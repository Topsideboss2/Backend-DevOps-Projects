import { UPDATE_MILESTONES_FAILURE, UPDATE_MILESTONES_REQUEST, UPDATE_MILESTONES_SUCCESS } from "../../Actions/Milestones/milestone.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const UpdateMilestoneReducer = (state = initialState, action) => {
        switch (action.type) {
            case UPDATE_MILESTONES_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case UPDATE_MILESTONES_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case UPDATE_MILESTONES_FAILURE:
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
export default UpdateMilestoneReducer;