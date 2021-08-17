import { Card, CardHeader,CardContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ASSINATURA_CREATE_RESET } from '../../../../constants/assinaturaConstantes';
import { createAssinatura } from '../../../../actions/assinaturaActions';
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../core/MessageBox/MessageBox";
function FormPaymentMatricula({handleNext,handleBack, plan}) {
    const classes = useStyles()
    const [sdkReady, setSdkReady] = useState(false)
    const assinaturaCreate = useSelector(state => state.assinaturaCreate)

    const {
        loading,
        error,
        assinatura
    } = assinaturaCreate

  

    const dispatch = useDispatch()

    useEffect(()=>{
        const addPayPalScript = async () =>{
            const { data } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(assinatura && assinatura.pago){
            dispatch({type: ASSINATURA_CREATE_RESET})
        } else {
            if(!assinatura || !assinatura.pago){
                if(!window.paypal){
                    addPayPalScript()
                } else {
                    setSdkReady(true)
                }
            }
        }
    },[assinatura, dispatch, plan])

    useEffect(()=>{
        if(assinatura && assinatura.pago){
            handleNext()
        }
    })

    const handleSuccessPayment = (paymentResult) => {
        dispatch(createAssinatura(plan,paymentResult))
    }

    return (
        <div>
          <Card >
            <CardHeader
                subheader="Escolha a opção de pagamento"
                title="Pagamento"
            />
            <CardContent>
                {
                    !sdkReady ? (<LoadingBox/>)
                    :(
                        <PayPalButton amount={plan.price} onSuccess={handleSuccessPayment} />
                    ) 
                }
            </CardContent>
            {loading && <LoadingBox />}
            {error && <MessageBox>{error}</MessageBox>}
          </Card>  
        </div>
    )
}

export default FormPaymentMatricula
