import Api from "../api/api";
import { POST_CREATE_FAIL, POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_FIND_FAIL, POST_FIND_REQUEST, POST_FIND_SUCCESS, POST_INFORMATIONS_FAIL, POST_INFORMATIONS_REQUEST, POST_INFORMATIONS_SUCCESS } from "../constants/postConstantes";


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
            payload: error.error || error.message
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
            payload: error.error || error.message
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
        
        console.log(data)    
        dispatch({type:POST_INFORMATIONS_SUCCESS, payload: data})
    } catch (error){
        dispatch({
            type: POST_INFORMATIONS_FAIL,
            payload: error.error || error.message
          });
    }
}