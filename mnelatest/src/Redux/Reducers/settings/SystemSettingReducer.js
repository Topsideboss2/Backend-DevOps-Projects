import {  GENERAL_SETTING_FAILURE, GENERAL_SETTING_REQUEST, GENERAL_SETTING_SUCCESS } from "../../Actions/Settings/Setting.type"


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const SystemSettingReducer = (state = initialState, action) => {
        switch (action.type) {
            case GENERAL_SETTING_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GENERAL_SETTING_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case GENERAL_SETTING_FAILURE:
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
export default SystemSettingReducer;