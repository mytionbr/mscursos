import Api from "../api/api";
import {
  CURSO_CREATE_FAIL,
  CURSO_CREATE_REQUEST,
  CURSO_CREATE_SUCCESS,
  CURSO_DETAILS_FAIL,
  CURSO_DETAILS_REQUEST,
  CURSO_DETAILS_SUCCESS,
  CURSO_FIND_FAIL,
  CURSO_FIND_REQUEST,
  CURSO_FIND_SUCCESS,
  CURSO_LIST_FAIL,
  CURSO_LIST_REQUEST,
  CURSO_LIST_SUCCESS,
  CURSO_PROFESSOR_FAIL,
  CURSO_PROFESSOR_REQUEST,
  CURSO_PROFESSOR_SUCCESS,
} from "../constants/cursoConstants";

export const listCursos = () => async (dispatch) => {
  dispatch({
    type: CURSO_LIST_REQUEST,
  });
  try {
    const { data } = await Api.fetchCursos();

    dispatch({ type: CURSO_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CURSO_LIST_FAIL, payload: error.message });
  }
};

export const findCursos = (params) => async (dispatch) => {
  dispatch({ type: CURSO_FIND_REQUEST });
  try {
    const { nome, categorias, pagination } = params;

    let queryString = "?";

    if (nome) {
      queryString += `nome=${nome}&`;
    }

    if (categorias) {
      queryString += categorias
        .map((c) => {
          return `categoria=${c.categoria_id || c}`;
        })
        .join("&");
    }

    if (pagination) {
      queryString += `&page=${pagination}`;
    }

    const { data } = await Api.findCursos(queryString);

    dispatch({ type: CURSO_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CURSO_FIND_FAIL,
      payload: error.message,
    });
  }
};

export const findCursosByProfessor = (params) => async (dispatch, getState) => {
  const {
    professorSignin: { professorInfo },
  } = getState();
  dispatch({
    type: CURSO_PROFESSOR_REQUEST,
    payload: professorInfo.professor_id,
  });
  try {
    const { nome, categorias } = params;

    let queryString = "?";

    if (nome) {
      queryString += `nome=${nome}&`;
    }

    if (categorias) {
      queryString += categorias
        .map((c) => {
          return `categoria=${c.categoria_id || c}`;
        })
        .join("&");
    }

    const { data } = await Api.findCursosByProfessor(
      professorInfo,
      queryString
    );
    console.log(data);
    dispatch({ type: CURSO_PROFESSOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CURSO_PROFESSOR_FAIL,
      payload: error.message,
    });
  }
};

export const createCurso = (curso) => async (dispatch, getState) => {
  dispatch({ type: CURSO_CREATE_REQUEST });
  const {
    professorSignin: { professorInfo },
  } = getState();
  try {
    curso.professor_id = professorInfo.professor_id;

    const { data } = await Api.createCurso(curso, professorInfo);
    dispatch({
      type: CURSO_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CURSO_CREATE_FAIL,
      payload: error.message,
    });
  }
};

export const detailsCurso = (cursoId) => async (dispatch) => {
  dispatch({ type: CURSO_DETAILS_REQUEST, payload: cursoId });
  try {
    const { data } = await Api.findCursoById(cursoId);
    dispatch({ type: CURSO_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CURSO_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
