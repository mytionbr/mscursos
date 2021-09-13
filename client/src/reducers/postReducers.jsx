import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_RESET,
  POST_CREATE_SUCCESS,
  POST_FIND_FAIL,
  POST_FIND_REQUEST,
  POST_FIND_SUCCESS,
  POST_INFORMATIONS_FAIL,
  POST_INFORMATIONS_REQUEST,
  POST_INFORMATIONS_RESET,
  POST_INFORMATIONS_SUCCESS,
} from "../constants/postConstantes";

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
  }
};

export const postCreateReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, data: action.payload };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postInformationsReducer = (
  state = {loading: true},
  action
) => {
  switch (action.type) {
    case POST_INFORMATIONS_REQUEST:
      return { loading: true };
    case POST_INFORMATIONS_SUCCESS:
      return { loading: false, data: action.payload };
    case POST_INFORMATIONS_FAIL:
      return { loading: false, error: action.payload };
    case POST_INFORMATIONS_RESET:
      return {};
    default:
      return state;
  }
};