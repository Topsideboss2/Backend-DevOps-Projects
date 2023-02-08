import { GET_ACTIVITIES_FAILURE, GET_ACTIVITIES_REQUEST, GET_ACTIVITIES_SUCCESS } from "../../Actions/Activities/activities.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetActivitiesReducer = (state = initialState, action) => {
        
        
        switch (action.type) {
           
            case GET_ACTIVITIES_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_ACTIVITIES_SUCCESS:
               console.log("accttiivities",action.deleting)
                return {
                    ...state,
                    loading:false, 
                    data:!action.deleting?action.payload.filter(function(activity) {
                        return activity.id != action.deleteId })
                        :action.payload,  
                    // data:action.payload,
                   
                }
                break;
            case GET_ACTIVITIES_FAILURE:
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
export default GetActivitiesReducer;