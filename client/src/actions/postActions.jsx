import Api from "../api/api";
import { POST_FIND_FAIL, POST_FIND_REQUEST, POST_FIND_SUCCESS } from "../constants/postConstantes";


export const findPosts = (params) => async (dispatch, getState) => {
    dispatch({ type: POST_FIND_REQUEST });
    const {
        alunoSignin: {alunoInfo },
      } = getState();
    try {
        const {  titulo, categoria, curso, opcao, pagination} = params;
        
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