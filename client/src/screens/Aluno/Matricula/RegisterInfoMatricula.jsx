import { Box, Container, Grid, Paper } from "@material-ui/core";
import React, { useState } from "react";
import MatriculaProcess from "../../../components/aluno/Matricula/MatriculaProcess/MatriculaProcess";
import StepperMatricula from "../../../components/aluno/Matricula/StepperMatricula/StepperMatricula";

function RegisterInfoMatricula() {
  const [step, setStep] = useState(0)
  
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <Box
      style={{
        backgroundColor: "inherit",
        minHeight: "100%",
        padding: "2rem 0",
      }}
    >
        <Container>
            <Grid container justifyContent={'space-evenly'} alignItems="center" spacing={3}>
                <Grid item lg={6} sm={12}>
                  <Paper>
                    <StepperMatricula step={step} />
                    <MatriculaProcess 
                      step={step} 
                      handleNext={handleNext}
                      handleBack={handleBack}/>
                  </Paper>
                </Grid>
                <Grid item lg={6} sm={12}>
                    
                </Grid>
            </Grid>
        </Container>
    </Box>
  );
}

export default RegisterInfoMatricula;
