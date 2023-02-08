import { GET_MILESTONES_TASKS_FAILURE, GET_MILESTONES_TASKS_REQUEST, GET_MILESTONES_TASKS_SUCCESS } from "../../Actions/Milestones/milestone.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetMilestoneTasksReducer = (state = initialState, action) => {
        
        
        switch (action.type) {
           
            case GET_MILESTONES_TASKS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_MILESTONES_TASKS_SUCCESS:
               
                return {
                    ...state,
                    loading:false,
                   
                    data:action.payload,
                   
                }
                break;
            case GET_MILESTONES_TASKS_FAILURE:
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
export default GetMilestoneTasksReducer;