import { AULA_CREATE_FAIL, AULA_CREATE_REQUEST, AULA_CREATE_RESET, AULA_CREATE_SUCCESS, AULA_DELETE_FAIL, AULA_DELETE_REQUEST, AULA_DELETE_RESET, AULA_DELETE_SUCCESS, AULA_DETAILS_FAIL, AULA_DETAILS_REQUEST, AULA_DETAILS_RESET, AULA_DETAILS_SUCCESS, AULA_FIND_FAIL, AULA_FIND_REQUEST, AULA_FIND_SUCCESS, AULA_UPDATE_FAIL, AULA_UPDATE_REQUEST, AULA_UPDATE_RESET, AULA_UPDATE_SUCCESS } from "../constants/aulaConstantes"

export const aulaFindReducer = (
    state = { loading: true, data:[] },
    action
) => {
    switch (action.type){
        case AULA_FIND_REQUEST:
            return { loading: true }
        case AULA_FIND_SUCCESS:
            return { loading: false, data: action.payload }
        case AULA_FIND_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const aulaDeleteReducer = (
    state ={},
    action 
) =>{
    switch(action.type){
        case AULA_DELETE_REQUEST:
            return { loading: true }
        case AULA_DELETE_SUCCESS:
            return { laoding: false, success: true}
        case AULA_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case AULA_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const aulaCreateReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case AULA_CREATE_REQUEST:
            return { loading: true }
        case AULA_CREATE_SUCCESS:
            return { loading: false, success: true }
        case AULA_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case AULA_CREATE_RESET:
            return {}
         default:
             return state   
    }
}

export const aulaDetailsReducer = (
    state = {loading:true},
    action
) => {
    switch (action.type) {
        case AULA_DETAILS_REQUEST:
            return { loading: true }
        case AULA_DETAILS_SUCCESS:
            return { loading: false, aula: action.payload }
        case AULA_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case AULA_DETAILS_RESET:
            return {}
         default:
             return state   
    }
}

export const aulaUpdateReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case AULA_UPDATE_REQUEST:
            return { loading: true }
        case AULA_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case AULA_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case AULA_UPDATE_RESET:
            return {}
         default:
             return state   
    }
}