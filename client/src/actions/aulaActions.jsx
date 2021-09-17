import Api from "../api/api";
import { AULA_CREATE_FAIL, AULA_CREATE_REQUEST, AULA_CREATE_SUCCESS, AULA_DELETE_FAIL, AULA_DELETE_REQUEST, AULA_DELETE_SUCCESS, AULA_DETAILS_FAIL, AULA_DETAILS_REQUEST, AULA_DETAILS_SUCCESS, AULA_FIND_FAIL, AULA_FIND_REQUEST, AULA_FIND_SUCCESS, AULA_FINISH_FAIL, AULA_FINISH_REQUEST, AULA_FINISH_SUCCESS, AULA_INFORMATIONS_FAIL, AULA_INFORMATIONS_REQUEST, AULA_INFORMATIONS_SUCCESS, AULA_INFO_LIST_FAIL, AULA_INFO_LIST_REQUEST, AULA_INFO_LIST_SUCCESS, AULA_UPDATE_FAIL, AULA_UPDATE_REQUEST, AULA_UPDATE_SUCCESS } from "../constants/aulaConstantes";
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
        payload: error.response.data.message || error.message
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
        payload: error.response.data.message || error.message
     });
    }
}

export const createAula = (aula) => async (dispatch, getState) => {
  dispatch({ type: AULA_CREATE_REQUEST });
  const {
    professorSignin: { professorInfo },
  } = getState();
  try {

    const formData = new FormData()

    formData.append("nome",aula.nome)
    formData.append("descricao", aula.descricao)
    formData.append("duracao", aula.duracao)
    formData.append("conteudo", aula.conteudo)
    formData.append("curso_id", aula.curso_id)
    formData.append("video", aula.video)
    
    const { data } = await Api.createAula(formData, professorInfo);
    dispatch({
      type: AULA_CREATE_SUCCESS,
      payload: data,
    });
    dispatch(findAssignments(professorInfo.professor_id))
  } catch (error) {
    console.log(error)
    dispatch({
      type: AULA_CREATE_FAIL,
      payload: error.response.data.message || error.message
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
      payload: error.response.data.message || error.message
    });
  }
};

export const updateAula = (aula) => async(dispatch, getState) => {
  dispatch({type: AULA_UPDATE_REQUEST, payload: aula})
  const {
      professorSignin: { professorInfo }
  } = getState()
  try {

    const formData = new FormData()
    
    formData.append("aula_id",aula.aula_id)
    formData.append("nome",aula.nome)
    formData.append("descricao", aula.descricao)
    formData.append("duracao", aula.duracao)
    formData.append("conteudo", aula.conteudo)
    formData.append("curso_id", aula.curso_id)
    formData.append("video", aula.video)

      const { data } = await Api.updateAula(formData,professorInfo)
      dispatch({type:AULA_UPDATE_SUCCESS, payload: data})
  } catch (error) {
      dispatch({
          type: AULA_UPDATE_FAIL,
          payload: error.response.data.message || error.message
        });
  }
}


export const findAulasInfo = (cursoSlug) => async (dispatch,getState) => {
  dispatch({ type: AULA_INFO_LIST_REQUEST, payload: cursoSlug });
  const {
    alunoSignin: { alunoInfo }
  } = getState()
  try {
    const { data } = await Api.findAulasInfoByCursoAndAluno(cursoSlug,alunoInfo);
  
    dispatch({ type: AULA_INFO_LIST_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: AULA_INFO_LIST_FAIL,
      payload: error.response.data.message || error.message
    });
  }
};

export const informationsAula = (aulaId) => async (dispatch,getState) => {
  dispatch({ type: AULA_INFORMATIONS_REQUEST, payload: aulaId });
  const {
    alunoSignin: { alunoInfo }
  } = getState()
  try {
    const { data } = await Api.findAulaInfoByIdAndAluno(aulaId,alunoInfo);
  
    dispatch({ type: AULA_INFORMATIONS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: AULA_INFORMATIONS_FAIL,
      payload: error.response.data.message || error.message
    });
  }
};

export const finishAula = (aula) => async (dispatch,getState) => {
  dispatch({ type: AULA_FINISH_REQUEST, payload: aula });
  const {
    alunoSignin: { alunoInfo },
    aulaInfoList: {data:aulaInfo}
  } = getState()
  try {
   
    const { data } = await Api.finishAula(aula,alunoInfo);
    console.log(data)
    dispatch({ type: AULA_FINISH_SUCCESS, payload: data });

    dispatch(findAulasInfo(aulaInfo.curso.slug));
  } catch (error) {
    dispatch({
      type: AULA_FINISH_FAIL,
      payload: error.response.data.message || error.message
    });
  }
};



