import Api from '../api/api'
import { CATEGORIA_LIST_FAIL, CATEGORIA_LIST_REQUEST, CATEGORIA_LIST_SUCCESS } from '../constants/categoriaConstants'

export const listCategoria = () => async (dispatch) => {
    dispatch({
        type: CATEGORIA_LIST_REQUEST,
    })
    try {
        const { data } = await Api.fetchCategorias()

        dispatch({ type: CATEGORIA_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ 
            type: CATEGORIA_LIST_FAIL, 
            payload: error.response.data.error || error.response.data.message })
    }
}

