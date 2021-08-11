import { ALUNO_FIND_FAIL, ALUNO_FIND_REQUEST, ALUNO_FIND_SUCCESS, ALUNO_NOTA_CREATE_FAIL, ALUNO_NOTA_CREATE_REQUEST, ALUNO_NOTA_CREATE_RESET, ALUNO_NOTA_CREATE_SUCCESS, ALUNO_NOTA_DELETE_FAIL, ALUNO_NOTA_DELETE_REQUEST, ALUNO_NOTA_DELETE_RESET, ALUNO_NOTA_DELETE_SUCCESS, ALUNO_NOTA_DETAILS_FAIL, ALUNO_NOTA_DETAILS_REQUEST, ALUNO_NOTA_DETAILS_RESET, ALUNO_NOTA_DETAILS_SUCCESS, ALUNO_NOTA_UPDATE_FAIL, ALUNO_NOTA_UPDATE_REQUEST, ALUNO_NOTA_UPDATE_RESET, ALUNO_NOTA_UPDATE_SUCCESS, ALUNO_SIGNIN_FAIL, ALUNO_SIGNIN_REQUEST, ALUNO_SIGNIN_SUCCESS } from "../constants/alunoConstantes";


export const alunoSigninReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case ALUNO_SIGNIN_REQUEST:
            return { loading: true }
        case ALUNO_SIGNIN_SUCCESS:
            return { loading: false, alunoInfo: action.payload }
        case ALUNO_SIGNIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const alunoFindReducer = (
    state = { loading: true, data:[] },
    action
) => {
    switch (action.type){
        case ALUNO_FIND_REQUEST:
            return { loading: true }
        case ALUNO_FIND_SUCCESS:
            return { loading: false, data: action.payload }
        case ALUNO_FIND_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const alunoNotaCreateReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case ALUNO_NOTA_CREATE_REQUEST:
            return { loading: true }
        case ALUNO_NOTA_CREATE_SUCCESS:
            return { loading: false, success: true }
        case ALUNO_NOTA_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case ALUNO_NOTA_CREATE_RESET:
            return {}
         default:
             return state   
    }
}

export const alunoNotaDetailsReducer = (
    state = {loading:true},
    action
) => {
    switch (action.type) {
        case ALUNO_NOTA_DETAILS_REQUEST:
            return { loading: true }
        case ALUNO_NOTA_DETAILS_SUCCESS:
            return { loading: false, nota: action.payload }
        case ALUNO_NOTA_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case ALUNO_NOTA_DETAILS_RESET:
            return {}
         default:
             return state   
    }
}

export const alunoNotaUpdateReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case ALUNO_NOTA_UPDATE_REQUEST:
            return { loading: true }
        case ALUNO_NOTA_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case ALUNO_NOTA_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case ALUNO_NOTA_UPDATE_RESET:
            return {}
         default:
             return state   
    }
}

export const alunoNotaDeleteReducer = (
    state ={},
    action 
) =>{
    switch(action.type){
        case ALUNO_NOTA_DELETE_REQUEST:
            return { loading: true }
        case ALUNO_NOTA_DELETE_SUCCESS:
            return { laoding: false, success: true}
        case ALUNO_NOTA_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case ALUNO_NOTA_DELETE_RESET:
            return {}
        default:
            return state
    }
}