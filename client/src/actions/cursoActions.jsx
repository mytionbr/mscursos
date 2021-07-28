import axios from 'axios'
import {fetchCursos} from '../api/api'
import { CURSO_LIST_FAIL, CURSO_LIST_REQUEST, CURSO_LIST_SUCCESS } from '../constants/cursosConstants'

export const listCursos = () => async (dispatch) => {
    console.log('Chegou em actions')
    dispatch({
        type: CURSO_LIST_REQUEST,
    })
    try {
        const { data } = await axios.get('/api/cursos')
        console.log(data)
        dispatch({ type: CURSO_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: CURSO_LIST_FAIL, payload: error.message })
    }
}