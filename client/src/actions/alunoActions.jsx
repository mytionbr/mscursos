import { ALUNO_FIND_FAIL, ALUNO_FIND_REQUEST, ALUNO_FIND_SUCCESS, ALUNO_NOTA_CREATE_FAIL, ALUNO_NOTA_CREATE_REQUEST, ALUNO_NOTA_CREATE_SUCCESS, ALUNO_NOTA_DELETE_FAIL, ALUNO_NOTA_DELETE_REQUEST, ALUNO_NOTA_DELETE_SUCCESS, ALUNO_NOTA_DETAILS_FAIL, ALUNO_NOTA_DETAILS_REQUEST, ALUNO_NOTA_DETAILS_SUCCESS, ALUNO_NOTA_UPDATE_FAIL, ALUNO_NOTA_UPDATE_REQUEST, ALUNO_NOTA_UPDATE_SUCCESS, ALUNO_SIGNIN_FAIL, ALUNO_SIGNIN_REQUEST, ALUNO_SIGNIN_SUCCESS } from "../constants/alunoConstantes"
import Api from '../api/api'

export const signin = (email, password) => async (dispatch) => {
    dispatch({type: ALUNO_SIGNIN_REQUEST, payload: {email, password}})
    try {
        const { data } = await Api.signinAluno(email, password)
        dispatch({type: ALUNO_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem('alunoInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: ALUNO_SIGNIN_FAIL,
            payload: error.error || error.message
        })
    }
}

export const findAlunos = (params) => async (dispatch,getState) => {
    dispatch({ type: ALUNO_FIND_REQUEST });
    const {
      professorSignin: { professorInfo },
    } = getState();
    try {
      const { nome, email, curso } = params;

      let queryString = "?";

      if (nome) {
        queryString += `nome=${nome}&`;
      }
  
      if (email) {
        queryString += `email=${email}&`;
      }
  
      const { data } = await Api.findAlunosByCurso(curso,queryString,professorInfo);
  
      dispatch({ type: ALUNO_FIND_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALUNO_FIND_FAIL,
        payload: error.error || error.message
      });
    }
  };
  
  export const findAlunosById = (alunoId) => async (dispatch,getState) => {
    dispatch({ type: ALUNO_FIND_REQUEST });
    const {
      professorSignin: { professorInfo },
    } = getState();
    try {
       
      const { data } = await Api.findAlunosById(alunoId,professorInfo);
  
      dispatch({ type: ALUNO_FIND_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALUNO_FIND_FAIL,
        payload: error.error || error.message
      });
    }
  };
  

  export const createNota = ({nota, curso, aluno }) => async (dispatch, getState) => {
    dispatch({ type: ALUNO_NOTA_CREATE_REQUEST });
    const {
      professorSignin: { professorInfo },
    } = getState();
    try {
      console.log(nota,curso,aluno)

      const { data } = await Api.createNota(nota,curso,aluno, professorInfo);
      dispatch({
        type: ALUNO_NOTA_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALUNO_NOTA_CREATE_FAIL,
        payload: error.error || error.message
      });
    }
  };

  export const detailsNota = ({notaId,cursoId}) => async (dispatch,getState) => {
    dispatch({ type: ALUNO_NOTA_DETAILS_REQUEST, payload: {notaId,cursoId} });
    const {
      professorSignin: { professorInfo }
    } = getState()
    try {
      console.log(notaId,cursoId)
      const { data } = await Api.findNotaByIdAndCurso(notaId,cursoId,professorInfo);
      console.log(data)
      dispatch({ type: ALUNO_NOTA_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALUNO_NOTA_DETAILS_FAIL,
        payload: error.error || error.message
      });
    }
  };

export const updateNota = (nota) => async(dispatch, getState) => {
    dispatch({type: ALUNO_NOTA_UPDATE_REQUEST, payload: nota})
    const {
        professorSignin: { professorInfo }
    } = getState()
    try {
        const { data } = await Api.updateNota(nota,professorInfo)
        dispatch({type:ALUNO_NOTA_UPDATE_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: ALUNO_NOTA_UPDATE_FAIL,
            payload: error.error || error.message
          });
    }
  }

export const deleteNota = (notaId) => async (dispatch, getState) => {
    dispatch({type: ALUNO_NOTA_DELETE_REQUEST, payload: notaId})
    const {
      professorSignin: { professorInfo }
    } = getState()
    try {
      const { data } = Api.deleteNota(notaId, professorInfo)
      dispatch({type: ALUNO_NOTA_DELETE_SUCCESS})
    } catch (error) {
      dispatch({
        type: ALUNO_NOTA_DELETE_FAIL,
        payload: error.error || error.message
     });
    }
}