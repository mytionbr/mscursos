import { CURSO_LIST_FAIL, CURSO_LIST_REQUEST, CURSO_LIST_SUCCESS } from "../constants/cursosConstants";


export const cursoListReducer = (
    state = {  loading: true, cursos: [] },
    action
) => {
    switch (action.type){
        case CURSO_LIST_REQUEST:
            return { loading: true }
        case CURSO_LIST_SUCCESS:
            return { loading: false, cursos: action.payload }
        case CURSO_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}