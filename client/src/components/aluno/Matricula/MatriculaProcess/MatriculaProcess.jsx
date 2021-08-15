import React from "react";
import EndProcess from "../EndProcess/EndProcess";
import FormInfoMatricula from "../FormInfoMatricula/FormInfoMatricula";
import FormPaymentMatricula from "../FormPaymentMatricula/FormPaymentMatricula";

function MatriculaProcess({ step, handleNext, handleBack }) {
  console.log(step === 0);
  return (
    <div>
      {step === 0 && <FormInfoMatricula handleNext={handleNext} />}{" "}
      {step === 1 && (
        <FormPaymentMatricula handleNext={handleNext} handleBack={handleBack} />
      )}
      {step === 2 && <EndProcess />}
    </div>
  );
}

export default MatriculaProcess;
