import { CREATE_MILESTONES_FAILURE, CREATE_MILESTONES_REQUEST, CREATE_MILESTONES_SUCCESS } from "../../Actions/Milestones/milestone.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const CreateMilestoneReducer = (state = initialState, action) => {
        switch (action.type) {
            case CREATE_MILESTONES_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case CREATE_MILESTONES_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case CREATE_MILESTONES_FAILURE:
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
export default CreateMilestoneReducer;