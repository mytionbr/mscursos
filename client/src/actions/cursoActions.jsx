import {fetchCursos, findCursosByParams} from '../api/api'
import { CURSO_FILTER_REQUEST, CURSO_FILTER_SUCCESS, CURSO_LIST_FAIL, CURSO_LIST_REQUEST, CURSO_LIST_SUCCESS } from '../constants/cursoConstants'

export const listCursos = () => async (dispatch) => {
    dispatch({
        type: CURSO_LIST_REQUEST,
    })
    try {
        const { data } = await fetchCursos()

        dispatch({ type: CURSO_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: CURSO_LIST_FAIL, payload: error.message })
    }
}

export const filterCursos = (query) => async (dispatch) => {
    dispatch({type: CURSO_FILTER_REQUEST, payload: query})
    try {
        console.log(query)
        const { nome, categorias } = query
        let queryString = "?"
        if (nome) {
            queryString += `nome=${nome}&`
        }
        console.log(queryString)

        if (categorias.length > 0) {
            queryString += categorias.map(c => {
                return `categoria=${c.categoria_id}`
            }).join('&')
        }
        console.log(queryString)
        const { data } = await findCursosByParams(queryString)
        dispatch({type: CURSO_FILTER_SUCCESS, payload: data})
    } catch (error){
        dispatch({
            type: CURSO_LIST_FAIL,
            payload: error.message
        })
    }
}