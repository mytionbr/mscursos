import Api from "../api/api";
import { AULA_CREATE_FAIL, AULA_CREATE_REQUEST, AULA_CREATE_SUCCESS, AULA_DELETE_FAIL, AULA_DELETE_REQUEST, AULA_DELETE_SUCCESS, AULA_DETAILS_FAIL, AULA_DETAILS_REQUEST, AULA_DETAILS_SUCCESS, AULA_FIND_FAIL, AULA_FIND_REQUEST, AULA_FIND_SUCCESS } from "../constants/aulaConstantes";

export const findAulas = (params) => async (dispatch) => {
    dispatch({ type: AULA_FIND_REQUEST });
    try {
      const { curso: cursoId, nome } = params;
  
      let queryString = "?";
  
      if (nome) {
        queryString += `nome=${nome}&`;
      }
  
      const { data } = await Api.findAulas(cursoId,queryString);
  
      dispatch({ type: AULA_FIND_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: AULA_FIND_FAIL,
        payload: error.response.data.error || error.response.data.message
      });
    }
  };
  
  export const deleteAula = ({aulaId,cursoId}) => async (dispatch, getState) => {
    dispatch({type: AULA_DELETE_REQUEST, payload: {aulaId,cursoId}})
    const {
      professorSignin: { professorInfo }
    } = getState()
    try {
      const { data } = Api.deleteCurso(aulaId,cursoId, professorInfo)
      dispatch({type: AULA_DELETE_SUCCESS})
    } catch (error) {
      dispatch({
        type: AULA_DELETE_FAIL,
        payload: error.response.data.error || error.response.data.message
      });
    }
}

export const createAula = (aula) => async (dispatch, getState) => {
  dispatch({ type: AULA_CREATE_REQUEST });
  const {
    professorSignin: { professorInfo },
  } = getState();
  try {
    const { data } = await Api.createAula(aula, professorInfo);
    dispatch({
      type: AULA_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AULA_CREATE_FAIL,
      payload: error.response.data.error || error.response.data.message
    });
  }
};


export const detailsAula = (aulaId,cursoId) => async (dispatch) => {
  dispatch({ type: AULA_DETAILS_REQUEST, payload: {aulaId: aulaId,cursoId: cursoId} });
  try {
    const { data } = await Api.findAulaById(aulaId,cursoId);
  
    dispatch({ type: AULA_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AULA_DETAILS_FAIL,
      payload: error
    });
  }
};