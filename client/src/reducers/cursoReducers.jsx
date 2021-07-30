import { CURSO_FIND_FAIL, CURSO_FIND_REQUEST, CURSO_FIND_SUCCESS, CURSO_LIST_FAIL, CURSO_LIST_REQUEST, CURSO_LIST_SUCCESS } from "../constants/cursoConstants";


export const cursoListReducer = (
    state = {  loading: true, cursos: [] },
    action
) => {
    switch (action.type){
        case CURSO_LIST_REQUEST:
            return { loading: true }
        case CURSO_LIST_SUCCESS:
            return { loading: false, cursos: action.payload }
        case CURSO_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const cursoFindReducer = (
    state = { loading: true, cursos:[] },
    action
) => {
    switch (action.type){
        case CURSO_FIND_REQUEST:
            return { loading: true }
        case CURSO_FIND_SUCCESS:
            return { loading: false, cursos: action.payload }
        case CURSO_FIND_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}