import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../Actions/Auth/Auth.Type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const LoginReducer = (state = initialState, action) => {
        switch (action.type) {
            case LOGIN_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case LOGIN_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case LOGIN_FAILURE:
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
export default LoginReducer;