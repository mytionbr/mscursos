import Api from "../api/api";
import { PROFESSOR_ASSIGNMENTS_FAIL, PROFESSOR_ASSIGNMENTS_REQUEST, PROFESSOR_ASSIGNMENTS_SUCCESS, PROFESSOR_SIGNIN_FAIL, PROFESSOR_SIGNIN_REQUEST, PROFESSOR_SIGNIN_SUCCESS, PROFESSOR_SIGNOUT } from "../constants/professorConstantes";

export const signin = (email, password) => async (dispatch) => {
    dispatch({type: PROFESSOR_SIGNIN_REQUEST, payload: {email, password}})
    try {
        const { data } = await Api.signinProfessor(email,password)

        dispatch({type: PROFESSOR_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem('professorInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: PROFESSOR_SIGNIN_FAIL,
            payload: error.response.data.error || error.response.data.message
        })
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('professorInfo')
    dispatch({type:PROFESSOR_SIGNOUT})
    document.location.href = '/professor/signin'
}

export const findAssignments = (id) => async (dispatch,getState) => {
    dispatch({type: PROFESSOR_ASSIGNMENTS_REQUEST,payload:{id}})
    const { professorSignin: { professorInfo } } = getState()
    try {
       const { data } = await Api.findAssignmentsProfessor(id,professorInfo)
       dispatch({type: PROFESSOR_ASSIGNMENTS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type:PROFESSOR_ASSIGNMENTS_FAIL, 
            payload: error.response.data.error || error.response.data.message
        })
    }
}