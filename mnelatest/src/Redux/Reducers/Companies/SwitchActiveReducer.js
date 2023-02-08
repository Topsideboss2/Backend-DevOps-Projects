import { SWITCH_ACTIVE_COMPANY_FAILURE, SWITCH_ACTIVE_COMPANY_REQUEST, SWITCH_ACTIVE_COMPANY_SUCCESS } from "../../Actions/Companies/Company.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const SwitchActiveReducer = (state = initialState, action) => {
        switch (action.type) {
            case SWITCH_ACTIVE_COMPANY_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case SWITCH_ACTIVE_COMPANY_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case SWITCH_ACTIVE_COMPANY_FAILURE:
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
export default SwitchActiveReducer;