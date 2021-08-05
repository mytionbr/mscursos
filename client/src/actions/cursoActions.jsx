import Api from '../api/api'
import { CURSO_FIND_FAIL, CURSO_FIND_REQUEST, CURSO_FIND_SUCCESS, CURSO_LIST_FAIL, CURSO_LIST_REQUEST, CURSO_LIST_SUCCESS, CURSO_PROFESSOR_FAIL, CURSO_PROFESSOR_REQUEST, CURSO_PROFESSOR_SUCCESS } from '../constants/cursoConstants'

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
    dispatch({type: CURSO_FIND_REQUEST})
    try {
       
        const { nome, categorias, pagination } = query
        console.log(nome, categorias, pagination)
        let queryString = "?"
        
        if (nome) {
            queryString += `nome=${nome}&`
        }
        
        if (categorias) {
            queryString += categorias.map(c => {
                return `categoria=${c.categoria_id || c}`
            }).join('&')
        }

        if(pagination ){
            queryString += `&page=${pagination}`
        }

        console.log(queryString)      
        
        const { data } = await Api.findCursos(queryString)
        
        dispatch({type: CURSO_FIND_SUCCESS, payload: data})
    } catch (error){
        dispatch({
            type: CURSO_FIND_FAIL,
            payload: error.message
        })
    }
}

export const findCursosByProfessor = () => async (dispatch, getState) => {
    const {professorSignin: {professorInfo}} = getState()
    dispatch({type:CURSO_PROFESSOR_REQUEST, payload: professorInfo.professor_id})
    try{
        const { data } = await Api.findCursosByProfessor(professorInfo)
        console.log(data)
        dispatch({type:CURSO_PROFESSOR_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ 
            type: CURSO_PROFESSOR_FAIL, 
            payload: error.message })
    }
}