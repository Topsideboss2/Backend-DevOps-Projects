import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../../Actions/Auth/Auth.Type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const RegisterReducer = (state = initialState, action) => {
        switch (action.type) {
            case REGISTER_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case REGISTER_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case REGISTER_FAILURE:
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
export default RegisterReducer;