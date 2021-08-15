import { Divider, Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";


function StepperMatricula({ step }) {
  const classes = useStyles();
   const steps = [
    "Suas informações",
    "Infomações de pagamento",
    "Acesse a plataforma",
  ];
  return (
    <div>
      <Stepper color="secondary" activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Divider />
    </div>
  );
}

export default StepperMatricula;
