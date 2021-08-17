import { ASSINATURA_CREATE_FAIL, ASSINATURA_CREATE_REQUEST, ASSINATURA_CREATE_RESET, ASSINATURA_CREATE_SUCCESS } from "../constants/assinaturaConstantes";

export const assinaturaCreateReducer = (state = {}, action)=>{
    switch (action.type){
        case ASSINATURA_CREATE_REQUEST:
            return { loading: true }
        case ASSINATURA_CREATE_SUCCESS:
            return { loading: false, success: true, assinatura: action.payload }
        case ASSINATURA_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case ASSINATURA_CREATE_RESET:
            return {}
        default:
            return state
    }
}