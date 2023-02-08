import { DELETE_MILESTONES_FAILURE, DELETE_MILESTONES_REQUEST, DELETE_MILESTONES_SUCCESS } from "../../Actions/Milestones/milestone.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const DeleteMilestoneReducer = (state = initialState, action) => {
        switch (action.type) {
            case DELETE_MILESTONES_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case DELETE_MILESTONES_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case DELETE_MILESTONES_FAILURE:
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
export default DeleteMilestoneReducer;