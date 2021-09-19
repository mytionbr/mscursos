import {
  ALUNO_DETAILS_FAIL,
  ALUNO_DETAILS_REQUEST,
  ALUNO_DETAILS_SUCCESS,
  ALUNO_FIND_CURSOS_FAIL,
  ALUNO_FIND_CURSOS_REQUEST,
  ALUNO_FIND_CURSOS_SUCCESS,
  ALUNO_FIND_FAIL,
  ALUNO_FIND_REQUEST,
  ALUNO_FIND_SUCCESS,
  ALUNO_INFORMATIONS_FAIL,
  ALUNO_INFORMATIONS_REQUEST,
  ALUNO_INFORMATIONS_SUCCESS,
  ALUNO_NOTA_CREATE_FAIL,
  ALUNO_NOTA_CREATE_REQUEST,
  ALUNO_NOTA_CREATE_SUCCESS,
  ALUNO_NOTA_DELETE_FAIL,
  ALUNO_NOTA_DELETE_REQUEST,
  ALUNO_NOTA_DELETE_SUCCESS,
  ALUNO_NOTA_DETAILS_FAIL,
  ALUNO_NOTA_DETAILS_REQUEST,
  ALUNO_NOTA_DETAILS_SUCCESS,
  ALUNO_NOTA_UPDATE_FAIL,
  ALUNO_NOTA_UPDATE_REQUEST,
  ALUNO_NOTA_UPDATE_SUCCESS,
  ALUNO_REGISTER_FAIL,
  ALUNO_REGISTER_REQUEST,
  ALUNO_REGISTER_SUCCESS,
  ALUNO_SIGNIN_FAIL,
  ALUNO_SIGNIN_REQUEST,
  ALUNO_SIGNIN_SUCCESS,
  ALUNO_SIGNOUT,
  ALUNO_UPDATE_FAIL,
  ALUNO_UPDATE_REQUEST,
  ALUNO_UPDATE_SUCCESS,
} from "../constants/alunoConstantes";
import Api from "../api/api";

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: ALUNO_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Api.signinAluno(email, password);
    dispatch({ type: ALUNO_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("alunoInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ALUNO_SIGNIN_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("alunoInfo");
  dispatch({ type: ALUNO_SIGNOUT });
  document.location.href = "/aluno/signin";
};

export const findAlunos = (params) => async (dispatch, getState) => {
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

    const { data } = await Api.findAlunosByCurso(
      curso,
      queryString,
      professorInfo
    );

    dispatch({ type: ALUNO_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALUNO_FIND_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const findAlunosById = (alunoId) => async (dispatch, getState) => {
  dispatch({ type: ALUNO_FIND_REQUEST });
  const {
    professorSignin: { professorInfo },
  } = getState();
  try {
    const { data } = await Api.findAlunosById(alunoId, professorInfo);

    dispatch({ type: ALUNO_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALUNO_FIND_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const createNota =
  ({ nota, curso, aluno }) =>
  async (dispatch, getState) => {
    dispatch({ type: ALUNO_NOTA_CREATE_REQUEST });
    const {
      professorSignin: { professorInfo },
    } = getState();
    try {
      const { data } = await Api.createNota(nota, curso, aluno, professorInfo);
      dispatch({
        type: ALUNO_NOTA_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALUNO_NOTA_CREATE_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

export const detailsNota =
  ({ notaId, cursoId }) =>
  async (dispatch, getState) => {
    dispatch({
      type: ALUNO_NOTA_DETAILS_REQUEST,
      payload: { notaId, cursoId },
    });
    const {
      professorSignin: { professorInfo },
    } = getState();
    try {
      const { data } = await Api.findNotaByIdAndCurso(
        notaId,
        cursoId,
        professorInfo
      );
      dispatch({ type: ALUNO_NOTA_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALUNO_NOTA_DETAILS_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

export const updateNota = (nota) => async (dispatch, getState) => {
  dispatch({ type: ALUNO_NOTA_UPDATE_REQUEST, payload: nota });
  const {
    professorSignin: { professorInfo },
  } = getState();
  try {
    const { data } = await Api.updateNota(nota, professorInfo);
    dispatch({ type: ALUNO_NOTA_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALUNO_NOTA_UPDATE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const deleteNota = (notaId) => async (dispatch, getState) => {
  dispatch({ type: ALUNO_NOTA_DELETE_REQUEST, payload: notaId });
  const {
    professorSignin: { professorInfo },
  } = getState();
  try {
    const { data } = await Api.deleteNota(notaId, professorInfo);
    dispatch({ type: ALUNO_NOTA_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ALUNO_NOTA_DELETE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const register =
  ({ nome, senha, data_nascimento, telefone, cpf, email }) =>
  async (dispatch) => {
    dispatch({
      type: ALUNO_REGISTER_REQUEST,
      payload: {
        nome,
        senha,
        data_nascimento,
        telefone,
        cpf,
        email,
      },
    });
    try {
      const { data } = await Api.registerAluno({
        nome,
        senha,
        data_nascimento,
        telefone,
        cpf,
        email,
      });
      dispatch({ type: ALUNO_REGISTER_SUCCESS, payload: data });
      dispatch({ type: ALUNO_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("alunoInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ALUNO_REGISTER_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

export const findCursos = () => async (dispatch, getState) => {
  dispatch({ type: ALUNO_FIND_CURSOS_REQUEST });
  const {
    alunoSignin: { alunoInfo },
  } = getState();
  try {
    const { data } = await Api.findCursosByAluno(alunoInfo);
    dispatch({ type: ALUNO_FIND_CURSOS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALUNO_FIND_CURSOS_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const detailsAluno = (alunoId) => async (dispatch, getState) => {
  dispatch({ type: ALUNO_DETAILS_REQUEST });
  const {
    alunoSignin: { alunoInfo },
  } = getState();
  try {
    const { data } = await Api.findAlunoDetails(alunoId, alunoInfo);

    dispatch({ type: ALUNO_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALUNO_DETAILS_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const informationAluno = (alunoId) => async (dispatch, getState) => {
  dispatch({ type: ALUNO_INFORMATIONS_REQUEST });
  const {
    alunoSignin: { alunoInfo },
  } = getState();
  try {
    const { data } = await Api.findAlunoInformations(alunoId, alunoInfo);

    dispatch({ type: ALUNO_INFORMATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALUNO_INFORMATIONS_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const updateAluno = (aluno) => async (dispatch, getState) => {
  dispatch({ type: ALUNO_UPDATE_REQUEST });
  const {
    alunoSignin: { alunoInfo },
  } = getState();
  try {
    aluno.aluno_id = alunoInfo.aluno_id;
    const { data } = await Api.updateAluno(aluno, alunoInfo);

    localStorage.setItem("alunoInfo", JSON.stringify(data));
    dispatch({ type: ALUNO_SIGNIN_SUCCESS, payload: data });
    dispatch({ type: ALUNO_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALUNO_UPDATE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
