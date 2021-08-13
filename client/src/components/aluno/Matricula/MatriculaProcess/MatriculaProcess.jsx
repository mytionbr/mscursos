import React from 'react'
import EndProcess from '../EndProcess/EndProcess'
import FormInfoMatricula from '../FormInfoMatricula/FormInfoMatricula'
import FormPaymentMatricula from '../FormPaymentMatricula/FormPaymentMatricula'

function MatriculaProcess({stape,handleNext,handleBack}) {
    return (
        <div>
            {
                stape === 0 ? (
                    <FormInfoMatricula handleNext={handleNext} />
                ) : stape === 1 ? (
                    <FormPaymentMatricula
                        handleNext={handleNext}
                        handleBack={handleBack}/>
                ) : stape === 2 && (
                    <EndProcess />
                )
            }
        </div>
    )
}

export default MatriculaProcess
