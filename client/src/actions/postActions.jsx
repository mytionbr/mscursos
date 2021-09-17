import Api from "../api/api";
import { POST_CREATE_FAIL, POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_FIND_FAIL, POST_FIND_REQUEST, POST_FIND_SUCCESS, POST_INFORMATIONS_FAIL, POST_INFORMATIONS_REQUEST, POST_INFORMATIONS_SUCCESS, POST_RESPONSE_LIST_FAIL, POST_RESPONSE_LIST_REQUEST, POST_RESPONSE_LIST_SUCCESS, POST_SAVE_RESPONSE_FAIL, POST_SAVE_RESPONSE_REQUEST, POST_SAVE_RESPONSE_SUCCESS, POST_SOLUTION_FAIL, POST_SOLUTION_REQUEST, POST_SOLUTION_SUCCESS } from "../constants/postConstantes";


export const findPosts = (params) => async (dispatch, getState) => {
    dispatch({ type: POST_FIND_REQUEST });
    const {
        alunoSignin: {alunoInfo },
      } = getState();
    try {
        const {  titulo, categoria, curso, opcao, pagination} = params;
        console.log( params)
        let queryString = "?"

        if(titulo){
            queryString += `titulo=${titulo}&`;
        }

        if(categoria){
            queryString += `categoria=${categoria}&`;
        }

        if(curso){
            queryString += `curso=${curso}&`;
        }

        if(opcao){
            queryString += `opcao=${opcao}&`;
        }

        if(pagination){
            queryString += `page=${pagination}&`;
        }
        
        const { data } = await Api.findPosts(queryString,alunoInfo);
        
        dispatch({type:POST_FIND_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: POST_FIND_FAIL,
            payload: error.response.data.message || error.message
          });
    }
}

export const createPost = ({titulo, conteudo, curso,  categoria}) => async (dispatch, getState) => {
    dispatch({ type: POST_CREATE_REQUEST });
    const {
        alunoSignin: {alunoInfo },
      } = getState();
    try {

        let post = {
            titulo: titulo,
            conteudo: conteudo,
            curso_id: curso,
            categoria_id: categoria,
            aluno_id: alunoInfo.aluno_id
        }
     
        const { data } = await Api.createPost(post,alunoInfo);
        
        dispatch({type:POST_CREATE_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload: error.response.data.message || error.message
          });
    }
}


export const informationsPost = (id) => async (dispatch, getState) =>{
    dispatch({ type: POST_INFORMATIONS_REQUEST });
    const {
        alunoSignin: {alunoInfo },
      } = getState();
    try {
        
        const { data }  = await Api.findPostById(id,alunoInfo);
        
        dispatch({type:POST_INFORMATIONS_SUCCESS, payload: data})
    } catch (error){
        dispatch({
            type: POST_INFORMATIONS_FAIL,
            payload: error.response.data.message || error.message
          });
    }
}

export const listResponse = (postId) => async (dispatch, getState) =>{
    dispatch({ type: POST_RESPONSE_LIST_REQUEST });
    const {
        alunoSignin: {alunoInfo },
      } = getState();
    try {

        const { data }  = await Api.listResponse(postId,alunoInfo);
       
        dispatch({type:POST_RESPONSE_LIST_SUCCESS, payload: data})
    } catch (error){
        dispatch({
            type: POST_RESPONSE_LIST_FAIL,
            payload: error.response.data.message || error.message
          });
    }
}

export const saveResposta = (resposta,postId) => async (dispatch, getState) =>{
    dispatch({ type: POST_SAVE_RESPONSE_REQUEST });
    const {
        alunoSignin: {alunoInfo },
      } = getState();
    try {
        
        const submit = {
            resposta: resposta,
            aluno_id:alunoInfo.aluno_id,
            post_id: postId
        }

        const { data }  = await Api.saveResponse(submit,alunoInfo);
       
        dispatch({type:POST_SAVE_RESPONSE_SUCCESS, payload: data})
    } catch (error){
        dispatch({
            type: POST_SAVE_RESPONSE_FAIL,
            payload: error.response.data.message || error.message
          });
    }
}

export const  markResponseAsSolution = ({resposta_id,post_id,aluno_id}) => async (dispatch, getState) =>{
    dispatch({ type: POST_SOLUTION_REQUEST });
    const {
        alunoSignin: {alunoInfo },
      } = getState();
    try {
        
        const submit = {
            resposta_id,
            post_id,
            aluno_id: aluno_id
        }

        const { data }  = await Api.markSolution(submit,alunoInfo);
       
        dispatch({type:POST_SOLUTION_SUCCESS, payload: data})
    } catch (error){
        dispatch({
            type: POST_SOLUTION_FAIL,
            payload: error.response.data.message || error.message
          });
    }
}