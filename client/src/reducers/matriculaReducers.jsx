import { MATRICULA_CREATE_FAIL, MATRICULA_CREATE_REQUEST, MATRICULA_CREATE_RESET, MATRICULA_CREATE_SUCCESS, MATRICULA_FIND_FAIL, MATRICULA_FIND_REQUEST, MATRICULA_FIND_RESET, MATRICULA_FIND_SUCCESS } from "../constants/cursoConstants copy"

export const matriculaFindReducer = (
    state = {loading:true},
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
    state = {loading:true},
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