import Api from '../api/api'
import { ALUNO_SIGNIN_SUCCESS } from '../constants/alunoConstantes'
import { ASSINATURA_CREATE_FAIL, ASSINATURA_CREATE_REQUEST, ASSINATURA_CREATE_SUCCESS } from '../constants/assinaturaConstantes'


export const createAssinatura = (plan, paymentResult) => async (dispatch,getState) =>{
    dispatch({type: ASSINATURA_CREATE_REQUEST, payload: {plan,paymentResult}})
    try{
        const {alunoSignin: {alunoInfo}} = getState()
        const { price,  _id: idPlano} = plan
        const { data } = await Api.createAssinatura(price, idPlano,paymentResult, alunoInfo)
        
        dispatch({type: ASSINATURA_CREATE_SUCCESS, payload: data})

        let alunoUpdate = alunoInfo
        alunoUpdate.assinatura = data

        dispatch({type: ALUNO_SIGNIN_SUCCESS, payload: alunoUpdate})
    } catch(error){
        dispatch({
            type:ASSINATURA_CREATE_FAIL,
            payload: error.response.data.message || error.message
         });
        }
    }
