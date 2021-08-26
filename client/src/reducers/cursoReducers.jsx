import { CURSO_CREATE_FAIL, CURSO_CREATE_REQUEST, CURSO_CREATE_RESET, CURSO_CREATE_SUCCESS, CURSO_DELETE_FAIL, CURSO_DELETE_REQUEST, CURSO_DELETE_RESET, CURSO_DELETE_SUCCESS, CURSO_DETAILS_FAIL, CURSO_DETAILS_REQUEST, CURSO_DETAILS_RESET, CURSO_DETAILS_SUCCESS, CURSO_FIND_FAIL, CURSO_FIND_REQUEST, CURSO_FIND_SUCCESS, CURSO_INFORMATIONS_FAIL, CURSO_INFORMATIONS_REQUEST, CURSO_INFORMATIONS_RESET, CURSO_INFORMATIONS_SUCCESS, CURSO_LIST_FAIL, CURSO_LIST_REQUEST, CURSO_LIST_SUCCESS, CURSO_MATRICULA_FAIL, CURSO_MATRICULA_REQUEST, CURSO_MATRICULA_RESET, CURSO_MATRICULA_SUCCESS, CURSO_PROFESSOR_FAIL, CURSO_PROFESSOR_REQUEST, CURSO_PROFESSOR_SUCCESS, CURSO_UPDATE_FAIL, CURSO_UPDATE_REQUEST, CURSO_UPDATE_RESET, CURSO_UPDATE_SUCCESS } from "../constants/cursoConstants";


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
    state = { loading: true, data:[] },
    action
) => {
    switch (action.type){
        case CURSO_FIND_REQUEST:
            return { loading: true }
        case CURSO_FIND_SUCCESS:
            return { loading: false, data: action.payload }
        case CURSO_FIND_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const cursoProfessorReducer = (
    state = {loading: true},
    action
) => {
    switch (action.type) {
        case CURSO_PROFESSOR_REQUEST:
            return { loading: true }
        case CURSO_PROFESSOR_SUCCESS:
            return { loading: false, data: action.payload }
        case CURSO_PROFESSOR_FAIL:
            return { loading: false, error: action.payload }
         default:
             return state   
    }
}

export const cursoCreateReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case CURSO_CREATE_REQUEST:
            return { loading: true }
        case CURSO_CREATE_SUCCESS:
            return { loading: false, success: true }
        case CURSO_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case CURSO_CREATE_RESET:
            console.log('ola')
            return {}
         default:
             return state   
    }
}

export const cursoDetailsReducer = (
    state = {loading:true},
    action
) => {
    switch (action.type) {
        case CURSO_DETAILS_REQUEST:
            return { loading: true }
        case CURSO_DETAILS_SUCCESS:
            return { loading: false, curso: action.payload }
        case CURSO_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case CURSO_DETAILS_RESET:
            return {}
         default:
             return state   
    }
}

export const cursoInformaionsReducer = (
    state = {loading:true},
    action
) => {
    switch (action.type) {
        case CURSO_INFORMATIONS_REQUEST:
            return { loading: true }
        case CURSO_INFORMATIONS_SUCCESS:
            return { loading: false, data: action.payload }
        case CURSO_INFORMATIONS_FAIL:
            return { loading: false, error: action.payload }
        case CURSO_INFORMATIONS_RESET:
            return {}
         default:
             return state   
    }
}

export const cursoUpdateReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case CURSO_UPDATE_REQUEST:
            return { loading: true }
        case CURSO_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case CURSO_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case CURSO_UPDATE_RESET:
            return {}
         default:
             return state   
    }
}

export const cursoDeleteReducer = (
    state ={},
    action 
) =>{
    switch(action.type){
        case CURSO_DELETE_REQUEST:
            return { loading: true }
        case CURSO_DELETE_SUCCESS:
            return { laoding: false, success: true}
        case CURSO_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case CURSO_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const cursoMatriculaReducer = (
    state = {loading:true},
    action
) => {
    switch (action.type) {
        case CURSO_MATRICULA_REQUEST:
            return { loading: true }
        case CURSO_MATRICULA_SUCCESS:
            return { loading: false, data: action.payload }
        case CURSO_MATRICULA_FAIL:
            return { loading: false, error: action.payload }
        case CURSO_MATRICULA_RESET:
            return {}
         default:
             return state   
    }
}