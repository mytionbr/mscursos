import { POST_FIND_FAIL, POST_FIND_REQUEST, POST_FIND_SUCCESS } from "../constants/postConstantes";

export const postFindReducer = (
    state = { loading: true, data: {} },
    action
  ) => {
    switch (action.type) {
      case POST_FIND_REQUEST:
        return { loading: true };
      case POST_FIND_SUCCESS:
        return { loading: false, data: action.payload };
      case POST_FIND_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }}
