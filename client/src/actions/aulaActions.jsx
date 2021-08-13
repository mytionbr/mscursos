import Api from "../api/api";
import { AULA_CREATE_FAIL, AULA_CREATE_REQUEST, AULA_CREATE_SUCCESS, AULA_DELETE_FAIL, AULA_DELETE_REQUEST, AULA_DELETE_SUCCESS, AULA_DETAILS_FAIL, AULA_DETAILS_REQUEST, AULA_DETAILS_SUCCESS, AULA_FIND_FAIL, AULA_FIND_REQUEST, AULA_FIND_SUCCESS, AULA_UPDATE_FAIL, AULA_UPDATE_REQUEST, AULA_UPDATE_SUCCESS } from "../constants/aulaConstantes";
import { findAssignments } from "./professorActions";

export const findAulas = (params) => async (dispatch) => {
    dispatch({ type: AULA_FIND_REQUEST });
    try {
      const { curso: cursoId, nome } = params;

      let queryString = "?";
  
      if (nome) {
        queryString += `nome=${nome}`;
      }
  
      const { data } = await Api.findAulas(cursoId,queryString);
  
      dispatch({ type: AULA_FIND_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: AULA_FIND_FAIL,
        payload: error.error || error.message
      });
    }
  };
  
  export const deleteAula = (aulaId,cursoId) => async (dispatch, getState) => {
    dispatch({type: AULA_DELETE_REQUEST, payload: {aulaId,cursoId}})
    const {
      professorSignin: { professorInfo }
    } = getState()
    try {

      const { data } = await Api.deleteAula(aulaId,cursoId, professorInfo)
      dispatch({type: AULA_DELETE_SUCCESS})
      dispatch(findAssignments(professorInfo.professor_id))
    } catch (error) {
      dispatch({
        type: AULA_DELETE_FAIL,
        payload: error.error || error.message
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
    dispatch(findAssignments(professorInfo.professor_id))
  } catch (error) {
    dispatch({
      type: AULA_CREATE_FAIL,
      payload: error.error || error.message
    });
  }
};


export const detailsAula = (aulaId,cursoId) => async (dispatch,getState) => {
  dispatch({ type: AULA_DETAILS_REQUEST, payload: {aulaId: aulaId,cursoId: cursoId} });
  const {
    professorSignin: { professorInfo }
  } = getState()
  try {
    const { data } = await Api.findAulaById(aulaId,cursoId,professorInfo);
  
    dispatch({ type: AULA_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: AULA_DETAILS_FAIL,
      payload: error.error || error.message
    });
  }
};

export const updateAula = (aula) => async(dispatch, getState) => {
  dispatch({type: AULA_UPDATE_REQUEST, payload: aula})
  const {
      professorSignin: { professorInfo }
  } = getState()
  try {
      const { data } = await Api.updateAula(aula,professorInfo)
      dispatch({type:AULA_UPDATE_SUCCESS, payload: data})
  } catch (error) {
      dispatch({
          type: AULA_UPDATE_FAIL,
          payload: error.error || error.message
        });
  }
}