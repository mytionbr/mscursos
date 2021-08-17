import React from "react";
import EndProcess from "../EndProcess/EndProcess";
import FormInfoMatricula from "../FormInfoMatricula/FormInfoMatricula";
import FormPaymentMatricula from "../FormPaymentMatricula/FormPaymentMatricula";

function MatriculaProcess({ step, handleNext, handleBack,plan}) {
  
  return (
    <div>
      {step === 0 && <FormInfoMatricula handleNext={handleNext} />}
      {step === 1 && (
        <FormPaymentMatricula handleNext={handleNext} handleBack={handleBack} plan={plan} />
      )}
      {step === 2 && <EndProcess />}
    </div>
  );
}

export default MatriculaProcess;
