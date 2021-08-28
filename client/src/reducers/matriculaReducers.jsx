import { MATRICULA_CREATE_FAIL, MATRICULA_CREATE_REQUEST, MATRICULA_CREATE_RESET, MATRICULA_CREATE_SUCCESS, MATRICULA_DELETE_FAIL, MATRICULA_DELETE_REQUEST, MATRICULA_DELETE_RESET, MATRICULA_DELETE_SUCCESS, MATRICULA_FIND_FAIL, MATRICULA_FIND_REQUEST, MATRICULA_FIND_RESET, MATRICULA_FIND_SUCCESS } from "../constants/matriculaConstants"

export const matriculaFindReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case MATRICULA_FIND_REQUEST:
            return { loading: true }
        case MATRICULA_FIND_SUCCESS:
            return { loading: false, data: action.payload }
        case MATRICULA_FIND_FAIL:
            return { loading: false, error: action.payload }
        case MATRICULA_FIND_RESET:
            return {}
         default:
             return state   
    }
}

export const matriculaCreateReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case MATRICULA_CREATE_REQUEST:
            return { loading: true }
        case MATRICULA_CREATE_SUCCESS:
            return { loading: false, data: action.payload }
        case MATRICULA_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case MATRICULA_CREATE_RESET:
            return {}
         default:
             return state   
    }
}


export const matriculaDeleteReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case MATRICULA_DELETE_REQUEST:
            return { loading: true }
        case MATRICULA_DELETE_SUCCESS:
            return { loading: false, success: true }
        case MATRICULA_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case MATRICULA_DELETE_RESET:
            return {}
         default:
             return state   
    }
}