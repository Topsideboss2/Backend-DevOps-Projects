import { GET_COMPANY_USERS_FAILURE, GET_COMPANY_USERS_REQUEST, GET_COMPANY_USERS_SUCCESS } from "../../Actions/Users/users.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetCompanyUsersReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_COMPANY_USERS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_COMPANY_USERS_SUCCESS:
                console.log("userdata",action.payload)
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                    
                }
                break;
            case GET_COMPANY_USERS_FAILURE:
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
export default GetCompanyUsersReducer;