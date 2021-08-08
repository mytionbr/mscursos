import { AULA_FIND_FAIL, AULA_FIND_REQUEST, AULA_FIND_SUCCESS } from "../constants/aulaConstantes"

export const aulaFindReducer = (
    state = { loading: true, data:[] },
    action
) => {
    switch (action.type){
        case AULA_FIND_REQUEST:
            return { loading: true }
        case AULA_FIND_SUCCESS:
            return { loading: false, data: action.payload }
        case AULA_FIND_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}