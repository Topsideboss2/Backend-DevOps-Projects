import { RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../../Actions/Auth/Auth.Type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const ResetPasswordReducer = (state = initialState, action) => {
        switch (action.type) {
            case RESET_PASSWORD_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case RESET_PASSWORD_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case RESET_PASSWORD_FAILURE:
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
export default ResetPasswordReducer;