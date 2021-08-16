import { Divider, Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";
import theme from "./styles";
import { ThemeProvider } from '@material-ui/core/styles'


function StepperMatricula({ step }) {
   const steps = [
    "Suas informações",
    "Infomações de pagamento",
    "Acesse a plataforma",
  ];
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Stepper color="secondary" activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      </ThemeProvider>
      
      <Divider />
    </div>
  );
}

export default StepperMatricula;
