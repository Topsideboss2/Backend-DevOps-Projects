import { GET_TASKS_FAILURE, GET_TASKS_REQUEST, GET_TASKS_SUCCESS } from "../../Actions/Task/Task.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetTasksReducer = (state = initialState, action) => {
        
        
        switch (action.type) {
           
            case GET_TASKS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_TASKS_SUCCESS:
               
                return {
                    ...state,
                    data:action.deleting?action.payload.filter(function(task) {
                        return task.id != action.deleteId })
                        :(Object.keys(action.addedTask).length>0)?action.payload.unshift(action.addedTask):
                        action.payload,
                    // data:action.payload,
                    
                   
                    loading:false
                }
                break;
            case GET_TASKS_FAILURE:
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
export default GetTasksReducer;