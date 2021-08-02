import { PROFESSOR_SIGNIN_FAIL, PROFESSOR_SIGNIN_REQUEST, PROFESSOR_SIGNIN_SUCCESS } from "../constants/professorConstantes";


export const professorSigninReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case PROFESSOR_SIGNIN_REQUEST:
            return { loading: true }
        case PROFESSOR_SIGNIN_SUCCESS:
            return { loading: false, professorInfo: action.payload }
        case PROFESSOR_SIGNIN_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}