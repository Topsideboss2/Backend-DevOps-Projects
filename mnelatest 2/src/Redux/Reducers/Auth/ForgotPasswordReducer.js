import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from "../../Actions/Auth/Auth.Type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const ForgotPasswordReducer = (state = initialState, action) => {
        switch (action.type) {
            case FORGOT_PASSWORD_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case FORGOT_PASSWORD_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case FORGOT_PASSWORD_FAILURE:
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
export default ForgotPasswordReducer;