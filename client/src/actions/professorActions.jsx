import Api from "../api/api";
import { PROFESSOR_SIGNIN_FAIL, PROFESSOR_SIGNIN_REQUEST, PROFESSOR_SIGNIN_SUCCESS } from "../constants/professorConstantes";

export const signin = (email, password) => async (dispatch) => {
    dispatch({type: PROFESSOR_SIGNIN_REQUEST, payload: {email, password}})
    try {
        const { data } = await Api.signinProfessor(email,password)

        dispatch({type: PROFESSOR_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: PROFESSOR_SIGNIN_FAIL,
            payload: error.response.data.error || error.response.data.message
        })
    }
}