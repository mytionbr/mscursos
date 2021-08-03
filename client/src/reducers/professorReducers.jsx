import { PROFESSOR_ASSIGNMENTS_FAIL, PROFESSOR_ASSIGNMENTS_REQUEST, PROFESSOR_ASSIGNMENTS_SUCCESS, PROFESSOR_SIGNIN_FAIL, PROFESSOR_SIGNIN_REQUEST, PROFESSOR_SIGNIN_SUCCESS } from "../constants/professorConstantes";


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

export const professorAssignmentsReducer = (
    state = {loading: true},
    action
) => {
    switch (action.type) {
        case PROFESSOR_ASSIGNMENTS_REQUEST:
            return { loading: true }
        case PROFESSOR_ASSIGNMENTS_SUCCESS:
            return { loading: false, professorAssignments: action.payload }
        case PROFESSOR_ASSIGNMENTS_FAIL:
            return { loading: false, error: action.payload }
         default:
             return state   
    }
}
