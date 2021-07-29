import { CATEGORIA_LIST_FAIL, CATEGORIA_LIST_REQUEST, CATEGORIA_LIST_SUCCESS } from "../constants/categoriaConstants"


export const categoriaListReducer = (
    state = {  loading: true, categorias: [] },
    action
) => {
    switch (action.type){
        case CATEGORIA_LIST_REQUEST:
            return { loading: true }
        case CATEGORIA_LIST_SUCCESS:
            return { loading: false, categorias: action.payload }
        case CATEGORIA_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}