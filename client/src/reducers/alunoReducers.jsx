import { ALUNO_SIGNIN_FAIL, ALUNO_SIGNIN_REQUEST, ALUNO_SIGNIN_SUCCESS } from "../constants/alunoConstantes";


export const alunoSigninReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case ALUNO_SIGNIN_REQUEST:
            return { loading: true }
        case ALUNO_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case ALUNO_SIGNIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

