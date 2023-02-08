import { GET_COMPANY_FAILURE, GET_COMPANY_REQUEST, GET_COMPANY_SUCCESS } from "../../Actions/Companies/Company.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetAllReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_COMPANY_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_COMPANY_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case GET_COMPANY_FAILURE:
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
export default GetAllReducer;