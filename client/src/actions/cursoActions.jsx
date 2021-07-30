import Api from '../api/api'
import { CURSO_FIND_REQUEST, CURSO_FIND_SUCCESS, CURSO_LIST_FAIL, CURSO_LIST_REQUEST, CURSO_LIST_SUCCESS } from '../constants/cursoConstants'

export const listCursos = () => async (dispatch) => {
    dispatch({
        type: CURSO_LIST_REQUEST,
    })
    try {
        const { data } = await Api.fetchCursos()

        dispatch({ type: CURSO_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: CURSO_LIST_FAIL, payload: error.message })
    }
}

export const findCursos = (query) => async (dispatch) => {
    dispatch({type: CURSO_FIND_REQUEST, payload: query})
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
        const { data } = await Api.findCursos(queryString)
        dispatch({type: CURSO_FIND_SUCCESS, payload: data})
    } catch (error){
        dispatch({
            type: CURSO_LIST_FAIL,
            payload: error.message
        })
    }
}