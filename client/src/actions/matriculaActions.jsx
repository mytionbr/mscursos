import Api from "../api/api";
import { MATRICULA_CREATE_FAIL, MATRICULA_CREATE_REQUEST, MATRICULA_CREATE_SUCCESS, MATRICULA_DELETE_FAIL, MATRICULA_DELETE_REQUEST, MATRICULA_DELETE_SUCCESS, MATRICULA_FIND_FAIL, MATRICULA_FIND_REQUEST, MATRICULA_FIND_RESET, MATRICULA_FIND_SUCCESS } from "../constants/matriculaConstants";

export const findMatricula = (alunoId,cursoId) => async (dispatch) => {
  dispatch({ type: MATRICULA_FIND_REQUEST, payload: {alunoId,cursoId} });
  try {
    const { data } = await Api.findMatricula(alunoId,cursoId);
    dispatch({ type: MATRICULA_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MATRICULA_FIND_FAIL,
      payload: error.error || error.message
    });
  }
};

export const createMatricula = (matricula) => async (dispatch,getState) => {
  dispatch({ type: MATRICULA_CREATE_REQUEST, payload: matricula });
  try {
    const { alunoSignin: { alunoInfo } } = getState()
    
    const { data } = await Api.createMatricula(matricula,alunoInfo);
    
    dispatch({ type: MATRICULA_CREATE_SUCCESS, payload: data });
    dispatch({ type: MATRICULA_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MATRICULA_CREATE_FAIL,
      payload: error.error || error.message
    });
  }
};


export const deleteMatricula = (matricula) => async (dispatch,getState) => {
  dispatch({ type: MATRICULA_DELETE_REQUEST, payload: matricula });
  try {
    const { alunoSignin: { alunoInfo } } = getState()
    
    const { data } = await Api.deleteMatricula(matricula,alunoInfo);
    
    dispatch({ type: MATRICULA_DELETE_SUCCESS });
    dispatch({type:MATRICULA_FIND_RESET})
  } catch (error) {
    dispatch({
      type: MATRICULA_DELETE_FAIL,
      payload: error.error || error.message
    });
  }
};