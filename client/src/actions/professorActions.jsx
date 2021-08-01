import { ALUNO_SIGNIN_FAIL, ALUNO_SIGNIN_REQUEST, ALUNO_SIGNIN_SUCCESS } from "../constants/alunoConstantes"
import Api from '../api'

export const signin = (email, password) => async (dispatch) => {
    dispatch({type: ALUNO_SIGNIN_REQUEST, payload: {email, password}})
    try {
        const { data } = await Api.signinAluno(email, password)
        dispatch({type: ALUNO_SIGNIN_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: ALUNO_SIGNIN_FAIL,
            payload: error.message || error.error || error
        })
    }
}