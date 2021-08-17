import { Box, Container, Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MatriculaProcess from "../../../components/aluno/Matricula/MatriculaProcess/MatriculaProcess";
import PaymentInfo from "../../../components/aluno/Matricula/PaymentInfo/PaymentInfo";
import StepperMatricula from "../../../components/aluno/Matricula/StepperMatricula/StepperMatricula";
import MessageBox from "../../../components/core/MessageBox/MessageBox";
import {data} from '../data'

function RegisterInfoMatricula(props) {
  const selectPlan = props.match.params.plano

  const [step, setStep] = useState(0)
  const [plan, setPlan] = useState(null)
  const [error, setError] = useState(false)
 
  useEffect(()=>{
    switch(selectPlan){
      case 'basico':
        setPlan(...data.filter(p => p._id === 1))
        break
      case 'intermediario':
        setPlan(...data.filter(p => p._id === 2))
        break
      case 'avancado':
        setPlan(...data.filter(p => p._id === 3))
        break
      default:
        setError(true);
    } 
  }, [selectPlan])
    

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <>
    {
      error ? (
        <MessageBox type="error">
          Erro na seleção do plano
        </MessageBox>
      ) : plan ? (
        <Box
      style={{
        backgroundColor: "inherit",
        minHeight: "100%",
        padding: "2rem 0",
      }}
    >
        <Container>
            <Grid container justifyContent={'space-evenly'}  alignItems="stretch" spacing={3}>
                <Grid item lg={8} sm={12}>
                  <Paper>
                    <StepperMatricula step={step} />
                    <MatriculaProcess 
                      step={step} 
                      handleNext={handleNext}
                      handleBack={handleBack}
                      plan={plan}/>
                  </Paper>
                </Grid>
                <Grid item lg={4} sm={12}>
                    <PaymentInfo data={plan} />
                </Grid>
            </Grid>
        </Container>
    </Box>
      ) : (
        ''
      )
    }
    </>
  );
}

export default RegisterInfoMatricula;
