import { GET_ROLES_FAILURE, GET_ROLES_REQUEST, GET_ROLES_SUCCESS } from "../../Actions/UserManagement/UserManagement.type";


 const initialState = {
    loading:false,
    error:"",
    data:[],
    dataarr:[]
 }
    const GetRoleUpdatableReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_ROLES_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_ROLES_SUCCESS:
                console.log("asssassa",action.payload)
                return {
                    ...state,
                    
                    dataarr:action.deleting?action.payload.filter(function(field) {
                        return field.id != action.deleteId })
                        :(Object.keys(action.addedArr).length>0)?action.payload.unshift(action.addedArr):
                        action.payload,
                    loading:false
                }
                break;
            case GET_ROLES_FAILURE:
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
export default GetRoleUpdatableReducer;