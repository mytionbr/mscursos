import { PROFESSOR_ASSIGNMENTS_FAIL, PROFESSOR_ASSIGNMENTS_REQUEST, PROFESSOR_ASSIGNMENTS_SUCCESS, PROFESSOR_DETAILS_FAIL, PROFESSOR_DETAILS_REQUEST, PROFESSOR_DETAILS_RESET, PROFESSOR_DETAILS_SUCCESS, PROFESSOR_SIGNIN_FAIL, PROFESSOR_SIGNIN_REQUEST, PROFESSOR_SIGNIN_SUCCESS, PROFESSOR_UPDATE_PROFILE_FAIL, PROFESSOR_UPDATE_PROFILE_REQUEST, PROFESSOR_UPDATE_PROFILE_RESET, PROFESSOR_UPDATE_PROFILE_SUCCESS } from "../constants/professorConstantes";


export const professorSigninReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case PROFESSOR_SIGNIN_REQUEST:
            return { loading: true }
        case PROFESSOR_SIGNIN_SUCCESS:
            return { loading: false, professorInfo: action.payload }
        case PROFESSOR_SIGNIN_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}

export const professorAssignmentsReducer = (
    state = {loading: true},
    action
) => {
    switch (action.type) {
        case PROFESSOR_ASSIGNMENTS_REQUEST:
            return { loading: true }
        case PROFESSOR_ASSIGNMENTS_SUCCESS:
            return { loading: false, professorAssignments: action.payload }
        case PROFESSOR_ASSIGNMENTS_FAIL:
            return { loading: false, error: action.payload }
         default:
             return state   
    }
}

export const professorDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case PROFESSOR_DETAILS_REQUEST:
        return { loading: true };
      case PROFESSOR_DETAILS_SUCCESS:
        return { loading: false, professor: action.payload };
      case PROFESSOR_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case PROFESSOR_DETAILS_RESET:
        return { loading: true };
      default:
        return state;
    }
  };

  export const professorUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case PROFESSOR_UPDATE_PROFILE_REQUEST:
        return { loading: true };
      case PROFESSOR_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success: true };
      case PROFESSOR_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload };
      case PROFESSOR_UPDATE_PROFILE_RESET:
        return {};
      default:
        return state;
    }
  };