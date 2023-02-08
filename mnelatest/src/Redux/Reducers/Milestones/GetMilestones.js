import { GET_MILESTONES_FAILURE, GET_MILESTONES_REQUEST, GET_MILESTONES_SUCCESS } from "../../Actions/Milestones/milestone.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetMilestoneReducer = (state = initialState, action) => {
        
        
        switch (action.type) {
           
            case GET_MILESTONES_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_MILESTONES_SUCCESS:
               
                return {
                    ...state,
                    loading:false,
                    data:action.deleting?action.payload.filter(function(milestone) {
                        return milestone.id != action.deleteId })
                        :(Object.keys(action.addedMilestone).length>0)?action.payload.unshift(action.addedMilestone):
                        action.payload,
                    // data:action.payload,
                   
                }
                break;
            case GET_MILESTONES_FAILURE:
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
export default GetMilestoneReducer;